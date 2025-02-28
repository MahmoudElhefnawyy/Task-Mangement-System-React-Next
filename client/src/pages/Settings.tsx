import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Task Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for upcoming tasks
                </p>
              </div>
              <Switch defaultChecked onChange={(e) => {
                localStorage.setItem("enableTaskReminders", e.target.checked.toString());
              }} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Due Date Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when tasks are nearly due
                </p>
              </div>
              <Switch defaultChecked onChange={(e) => {
                localStorage.setItem("enableDueDateAlerts", e.target.checked.toString());
              }} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Browser Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Show desktop notifications (requires permission)
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                      new Notification("Notifications Enabled", {
                        body: "You will now receive browser notifications for tasks"
                      });
                    }
                  });
                }}
              >
                Enable
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Defaults</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Default Priority</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
