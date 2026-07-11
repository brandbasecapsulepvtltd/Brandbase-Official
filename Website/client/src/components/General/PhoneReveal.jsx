'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { CONTACT } from '@/lib/contactConstants';

/**
 * Shows masked phone (+91 ****** 0416) by default.
 * When revealable=true (contact page only), an eye toggle reveals the full number with tel: link.
 */
export default function PhoneReveal({
  revealable = false,
  className = '',
  linkClassName = '',
}) {
  const [revealed, setRevealed] = useState(false);
  const showFull = revealable && revealed;
  const display = showFull ? CONTACT.phone : CONTACT.phoneMasked;

  const textEl =
    showFull ? (
      <a
        href={`tel:${CONTACT.phoneTel}`}
        className={linkClassName || className}
      >
        {display}
      </a>
    ) : (
      <span className={className}>{display}</span>
    );

  if (!revealable) {
    return textEl;
  }

  return (
    <span className="inline-flex items-center gap-2">
      {textEl}
      <button
        type="button"
        onClick={() => setRevealed((prev) => !prev)}
        className="p-1 rounded-md text-[#FF6600] hover:bg-[#FF6600]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600]"
        aria-label={revealed ? 'Hide phone number' : 'Show phone number'}
        aria-pressed={revealed}
      >
        {revealed ? (
          <EyeOff className="w-4 h-4" aria-hidden="true" />
        ) : (
          <Eye className="w-4 h-4" aria-hidden="true" />
        )}
      </button>
    </span>
  );
}
