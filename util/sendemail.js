const { Resend } = require('resend');
require('dotenv').config()
// Resend 무료 API 키 입력
const resend = new Resend(process.env.RESCENE)

async function sendReminderEmail(urgentFoods) {
  const foodListText = urgentFoods.map(food => `- ${food.name} (유통기한: ${food.expirationDate})`).join('\n');

  try {
    const data = await resend.emails.send({
      from:'"냉장고에 굶주린 검은흑곰🐻" <onboarding@resend.dev>',
      to: 'baechoo0527@gmail.com',  // 민준 님 수신 이메일
      subject: '🚨 [경고] 유통기한 임박 식품 알림',
      text: `안녕하세요!\n\n아래 식품 유통기한이 임박했습니다.\n\n${foodListText}`
    });

    console.log('✉️ 이메일 전송 성공! ID:', data.id);
  } catch (error) {
    console.error('❌ 이메일 전송 실패:', error);
  }
}

module.exports = sendReminderEmail;