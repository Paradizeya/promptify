import React, { useEffect } from "react";

const useOutsideClick = (
  callback: () => void,
  ref: React.RefObject<HTMLElement>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [callback, ref]);

  return ref;
};

export default useOutsideClick;
