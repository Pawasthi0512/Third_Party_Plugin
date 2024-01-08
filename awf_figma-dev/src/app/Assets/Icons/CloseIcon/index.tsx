import React from "react";

export function CloseIcon({ onClick = null }) {
  return (
    <div onClick={onClick}>
      <svg
        width={10}
        height={10}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 5.7 1.617 9.083a.49.49 0 0 1-.342.142.46.46 0 0 1-.358-.142.48.48 0 0 1 0-.7L4.3 5 .917 1.617a.491.491 0 0 1-.142-.342.46.46 0 0 1 .142-.358.48.48 0 0 1 .7 0L5 4.3 8.383.917a.494.494 0 0 1 .342-.142.462.462 0 0 1 .358.142.48.48 0 0 1 0 .7L5.7 5l3.383 3.383a.49.49 0 0 1 .142.342.46.46 0 0 1-.142.358.48.48 0 0 1-.7 0L5 5.7Z"
          fill="#333"
        />
      </svg>
    </div>
  );
}

export function SmallCloseIcon({ onClick = null }) {
  return (
    <div onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width={8} height={8} fill="none">
        <path
          fill="#333"
          d="M7.15.855a.498.498 0 0 0-.705 0L4 3.295 1.555.85a.498.498 0 1 0-.705.705L3.295 4 .85 6.445a.498.498 0 1 0 .705.705L4 4.705 6.445 7.15a.498.498 0 1 0 .705-.705L4.705 4 7.15 1.555c.19-.19.19-.51 0-.7Z"
        />
      </svg>
    </div>
  );
}
