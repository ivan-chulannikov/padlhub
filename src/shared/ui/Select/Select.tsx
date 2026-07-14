import { useEffect, useId, useRef, useState } from 'react';
import styles from './Select.module.css';

type SelectProps<TValue extends string> = {
  ariaLabel: string;
  value: TValue;
  options: readonly TValue[];
  onChange: (value: TValue) => void;
  disabled?: boolean;
};

const Select = <TValue extends string,>({
  ariaLabel,
  value,
  options,
  onChange,
  disabled = false,
}: SelectProps<TValue>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listboxId = useId();

  const open = () => {
    const selectedIndex = options.indexOf(value);
    setActiveIndex(selectedIndex === -1 ? 0 : selectedIndex);
    setIsOpen(true);
  };

  const close = (restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;

    optionRefs.current[activeIndex]?.focus();

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close(true);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activeIndex, isOpen]);

  const moveFocus = (nextIndex: number) => {
    const normalizedIndex = (nextIndex + options.length) % options.length;
    setActiveIndex(normalizedIndex);
    optionRefs.current[normalizedIndex]?.focus();
  };

  return (
    <div className={styles.select} ref={rootRef}>
      <button
        ref={triggerRef}
        className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        disabled={disabled}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            open();
          }
        }}
      >
        <span>{value}</span>
        <span className={styles.arrow} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className={styles.menu} id={listboxId} role="listbox" aria-label={ariaLabel}>
          {options.map((option, index) => (
            <button
              key={option}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              className={styles.option}
              type="button"
              role="option"
              aria-selected={option === value}
              tabIndex={index === activeIndex ? 0 : -1}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => {
                onChange(option);
                close(true);
              }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault();
                  moveFocus(activeIndex + 1);
                } else if (event.key === 'ArrowUp') {
                  event.preventDefault();
                  moveFocus(activeIndex - 1);
                } else if (event.key === 'Home') {
                  event.preventDefault();
                  moveFocus(0);
                } else if (event.key === 'End') {
                  event.preventDefault();
                  moveFocus(options.length - 1);
                }
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
