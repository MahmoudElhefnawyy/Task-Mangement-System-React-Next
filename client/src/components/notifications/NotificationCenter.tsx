
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "./NotificationProvider";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

export function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications,
  } = useNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2">
          <div className="font-medium">Notifications</div>
          <div className="flex gap-1">
            <Button
              onClick={markAllAsRead}
              variant="ghost"
              size="sm"
              className="h-auto py-1 px-2 text-xs"
              disabled={unreadCount === 0}
            >
              Mark all as read
            </Button>
            <Button
              onClick={clearAllNotifications}
              variant="ghost"
              size="sm"
              className="h-auto py-1 px-2 text-xs"
              disabled={notifications.length === 0}
            >
              Clear all
            </Button>
          </div>
        </div>
        <DropdownMenuSeparator />
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start p-3 ${
                  !notification.read ? "bg-muted/40" : ""
                }`}
                onSelect={(e) => {
                  e.preventDefault();
                  markAsRead(notification.id);
                }}
              >
                <div className="flex w-full justify-between">
                  <div className="font-medium">{notification.title}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearNotification(notification.id);
                    }}
                  >
                    &times;
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {notification.message}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(notification.timestamp), {
                    addSuffix: true,
                  })}
                </div>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
