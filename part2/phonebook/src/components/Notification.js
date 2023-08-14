import React from 'react';

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null;
  }

  const notificationClassName = isError ? 'notification error' : 'notification';

  return (
    <div className={notificationClassName}>
      {message}
    </div>
  );
};

export default Notification;
