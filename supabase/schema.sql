-- Supabase Database Schema for Portfolio Contact Form
-- Created for: 정케빈 (Kevin Jung) Portfolio
-- Date: 2025-01-01

-- Drop existing table if exists (be careful in production!)
DROP TABLE IF EXISTS contacts CASCADE;

-- Create contacts table
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  ip_address INET,
  user_agent TEXT,
  
  -- Additional metadata
  replied_at TIMESTAMP WITH TIME ZONE,
  reply_message TEXT,
  notes TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_email_created ON contacts(email, created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Policy 1: Service role can do everything
CREATE POLICY "Service role full access" ON contacts
  FOR ALL 
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Policy 2: Anonymous users can only insert
CREATE POLICY "Anonymous can insert" ON contacts
  FOR INSERT 
  WITH CHECK (true);

-- Policy 3: Authenticated users can read their own submissions
CREATE POLICY "Users can read own submissions" ON contacts
  FOR SELECT
  USING (auth.role() = 'authenticated' AND email = auth.email());

-- Add table comments
COMMENT ON TABLE contacts IS '포트폴리오 웹사이트 문의 양식 데이터';
COMMENT ON COLUMN contacts.id IS '고유 식별자';
COMMENT ON COLUMN contacts.name IS '문의자 이름';
COMMENT ON COLUMN contacts.email IS '문의자 이메일 주소';
COMMENT ON COLUMN contacts.message IS '문의 내용';
COMMENT ON COLUMN contacts.created_at IS '문의 생성 시간 (UTC)';
COMMENT ON COLUMN contacts.status IS '처리 상태: new(신규), read(읽음), replied(답변완료), closed(종료)';
COMMENT ON COLUMN contacts.ip_address IS '문의자 IP 주소';
COMMENT ON COLUMN contacts.user_agent IS '문의자 브라우저 정보';
COMMENT ON COLUMN contacts.replied_at IS '답변 시간';
COMMENT ON COLUMN contacts.reply_message IS '답변 내용';
COMMENT ON COLUMN contacts.notes IS '내부 메모';

-- Create function to update status to 'read' when viewing
CREATE OR REPLACE FUNCTION mark_contact_as_read(contact_id BIGINT)
RETURNS void AS $$
BEGIN
  UPDATE contacts
  SET status = CASE WHEN status = 'new' THEN 'read' ELSE status END
  WHERE id = contact_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to reply to contact
CREATE OR REPLACE FUNCTION reply_to_contact(
  contact_id BIGINT,
  reply_text TEXT
)
RETURNS void AS $$
BEGIN
  UPDATE contacts
  SET 
    status = 'replied',
    replied_at = NOW(),
    reply_message = reply_text
  WHERE id = contact_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create view for contact statistics
CREATE OR REPLACE VIEW contact_stats AS
SELECT 
  COUNT(*) as total_contacts,
  COUNT(CASE WHEN status = 'new' THEN 1 END) as new_contacts,
  COUNT(CASE WHEN status = 'read' THEN 1 END) as read_contacts,
  COUNT(CASE WHEN status = 'replied' THEN 1 END) as replied_contacts,
  COUNT(CASE WHEN status = 'closed' THEN 1 END) as closed_contacts,
  COUNT(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 END) as last_7_days,
  COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as last_30_days
FROM contacts;

-- Grant permissions on view
GRANT SELECT ON contact_stats TO anon, authenticated;

-- Sample data for testing (optional - remove in production)
-- INSERT INTO contacts (name, email, message, status) VALUES
-- ('테스트 사용자', 'test@example.com', '안녕하세요, 포트폴리오 잘 봤습니다. AI 프로젝트에 대해 더 자세히 알고 싶습니다.', 'new'),
-- ('김철수', 'kim@example.com', '부동산 투자 컨설팅에 관심이 있습니다. 상담 가능한 시간이 있으신가요?', 'read');

-- Create trigger for email notification (optional)
-- This would require Supabase Edge Functions or external webhook
CREATE OR REPLACE FUNCTION notify_new_contact()
RETURNS TRIGGER AS $$
BEGIN
  -- This is a placeholder for notification logic
  -- In real implementation, you would:
  -- 1. Call a Supabase Edge Function
  -- 2. Send to a webhook endpoint
  -- 3. Trigger an email service
  
  -- For now, just log to the database
  RAISE NOTICE 'New contact from: % <%>', NEW.name, NEW.email;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER on_new_contact
  AFTER INSERT ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact();