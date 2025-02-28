import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserCircle } from "lucide-react";

export default function Profile() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <Card className="max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback>
                <UserCircle className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <CardTitle>User Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Username</h3>
              <p className="text-lg">Demo User</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Email</h3>
              <p className="text-lg">user@example.com</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
