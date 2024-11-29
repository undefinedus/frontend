// NotificationsComponent.jsx
import React from "react";
import ToggleButton from "../../components/commons/ToggleButton";

const NotificationItem = ({
  id,
  alertTitle,
  description,
  isEnabled,
  onChange,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col items-start">
        <div className="font-bold text-base text-undtextdark">{alertTitle}</div>
        <div className="text-xs text-undtextgray">{description}</div>
      </div>
      <div className="flex items-center">
        <ToggleButton
          id={`toggle-${id}`}
          checked={isEnabled}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

const NotificationsComponent = ({ subtitle, notificationItems, className }) => {
  return (
    <div className={`${className}`}>
      <div className="flex flex-col gap-4 bg-undbgsub border border-unddisabled rounded-lg px-6 py-2.5">
        <div className="font-extrabold text-base text-undtextgray text-start">
          {subtitle}
        </div>
        {notificationItems.map((item, index) => (
          <NotificationItem
            key={item.id}
            id={item.id}
            alertTitle={item.alertTitle}
            description={item.description}
            isEnabled={item.isEnabled}
            onChange={item.onChange}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationsComponent;
