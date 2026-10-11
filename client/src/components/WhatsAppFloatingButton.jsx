import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloatingButton() {
  const whatsappUrl = 'https://wa.me/918602067751?text=' + encodeURIComponent(
    'Hello Manduva Logillu Furnitures! I am browsing your handcrafted vintage resort and farm collection and would like to inquire about pricing, custom pieces, and showroom availability.'
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="whatsapp-float-btn"
      title="Chat directly with Manduva Logillu on WhatsApp"
      aria-label="WhatsApp Chat"
    >
      <MessageCircle size={30} />
    </a>
  );
}
