"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function LogoutPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    if (isLoggingOut && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isLoggingOut && countdown === 0) {
      // Simulate logout
      setLoggedOut(true);
    }
  }, [isLoggingOut, countdown]);

  const handleLogout = () => {
    setIsLoggingOut(true);
  };

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <Card className="max-w-md w-full">
        <CardContent className="p-6">
          {!loggedOut ? (
            <>
              <div className="flex flex-col items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
                  <LogOut className="h-8 w-8 text-orange-500" />
                </div>
                <h1 className="text-2xl font-bold">Log Out</h1>
                <p className="text-center text-muted-foreground mt-2">
                  Are you sure you want to log out of your account?
                </p>
              </div>

              <div className="space-y-4">
                {isLoggingOut ? (
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p>
                      Logging out in {countdown} second{countdown !== 1 && "s"}
                      ...
                    </p>
                  </div>
                ) : (
                  <>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </Button>
                    <Link href="/account">
                      <Button variant="outline" className="w-full">
                        Cancel
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                <LogOut className="h-8 w-8 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold">Logged Out</h1>
              <p className="text-center text-muted-foreground mt-2 mb-6">
                You have been successfully logged out of your account.
              </p>
              <Link href="/login">
                <Button className="w-full">Log In Again</Button>
              </Link>
              <Link href="/" className="mt-4">
                <Button variant="outline" className="w-full">
                  Go to Homepage
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
