'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define your Dictionary
const dictionary = {
  en: {
    toggleBtn: '中文',
    kun: 'KUN',
    kun_char: '坤',
    keepMoving: 'Keep Moving',
    upgradeHome: 'Upgrade Your Home',
    newMaterial: 'New Material',
    sendInquiry: 'Send Inquiry',
    fullName: 'Full name',
    phoneEmail: 'Phone or Email',
    message: 'Message',
    submitBtn: 'Submit Inquiry',
    sending: 'Sending...',
    successTitle: 'Inquiry received',
    successMsg: 'Thank you! We will be in touch with you shortly.',
    sendAnother: 'Send Another Message',
    buy: 'Buy',
    sell: 'Sell',
    rent: 'Rent',
    bedroom: 'Bedroom',
    kitchen: 'Kitchen',
    bathroom: 'Bathroom',
    decor: 'Decor',
    'living-room': 'Living Room',
    'study-room': 'Study Room',
    clayPaint: 'Clay Paint',
    liquidRocks: 'Liquid Rocks',
    stoneAndSand: 'Stone and Sand',
  },
  zh: {
    toggleBtn: 'EN',
    kun: 'KUN', 
    kun_char: '坤',
    keepMoving: '租房买房',
    upgradeHome: '房屋升级',
    newMaterial: '新型材料',
    sendInquiry: '发送询价',
    fullName: '全名',
    phoneEmail: '电话或电子邮箱',
    message: '留言',
    submitBtn: '提交询价',
    sending: '发送中...',
    successTitle: '已收到询价',
    successMsg: '谢谢！我们将很快与您联系。',
    sendAnother: '再发一条信息',
    buy: '买房', 
    sell: '卖房', 
    rent: '租房',
    bedroom: '卧室',
    kitchen: '厨房',
    bathroom: '卫生间',
    decor: '装饰',
    'living-room': '客厅',
    'study-room': '书房',
    clayPaint: '艺术涂料', 
    liquidRocks: '液体岩石',
    stoneAndSand: '石与沙',
  }
};

type Language = 'en' | 'zh';
type Dictionary = typeof dictionary.en;

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: keyof Dictionary) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'zh' : 'en'));
  };

  // The 't' function pulls the correct word based on the current language
  const t = (key: keyof Dictionary) => {
    return dictionary[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use everywhere
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};