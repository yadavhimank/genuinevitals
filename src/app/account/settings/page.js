"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Bell,
  Globe,
  Shield,
  CreditCard,
  Mail,
  Smartphone,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

// Initial settings state
const initialSettings = {
  notifications: {
    email: {
      marketing: true,
      orderUpdates: true,
      productAlerts: false,
      newArrivals: true,
    },
    push: {
      orderUpdates: true,
      promotions: false,
      stockAlerts: true,
      reminders: false,
    },
  },
  privacy: {
    shareDataForAnalytics: true,
    profileVisibility: "public",
    activityTracking: true,
  },
  preferences: {
    language: "English",
    currency: "INR",
    theme: "system",
  },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState("notifications");

  const handleToggleChange = (category, subcategory, setting) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: {
          ...prev[category][subcategory],
          [setting]: !prev[category][subcategory][setting],
        },
      },
    }));
  };

  const handleSelectChange = (category, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  // List of settings tabs
  const tabs = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Data", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Globe },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/account" className="hover:text-primary transition-colors">
          My Account
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">Settings</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Tabs Navigation */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex items-center gap-3 p-4 text-left transition-colors hover:bg-card ${
                      activeTab === tab.id
                        ? "border-l-4 border-primary bg-primary/5"
                        : "border-l-4 border-transparent"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon
                      className={`h-5 w-5 ${
                        activeTab === tab.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                    <span className={activeTab === tab.id ? "font-medium" : ""}>
                      {tab.label}
                    </span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Need Help?</h3>
                    <p className="text-sm text-muted-foreground">
                      Contact our support team
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3">
          <Card>
            <CardContent className="p-6">
              {/* Notifications Settings */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    Notification Settings
                  </h2>

                  <div className="space-y-8">
                    {/* Email Notifications */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Mail className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Email Notifications</h3>
                      </div>

                      <div className="space-y-4 pl-7">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="marketing-emails"
                            className="flex flex-col"
                          >
                            <span>Marketing Emails</span>
                            <span className="text-sm text-muted-foreground">
                              Receive promotional offers and discounts
                            </span>
                          </label>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-muted">
                            <input
                              type="checkbox"
                              id="marketing-emails"
                              className="peer sr-only"
                              checked={settings.notifications.email.marketing}
                              onChange={() =>
                                handleToggleChange(
                                  "notifications",
                                  "email",
                                  "marketing"
                                )
                              }
                            />
                            <span
                              className={`${
                                settings.notifications.email.marketing
                                  ? "translate-x-5 bg-primary"
                                  : "translate-x-0 bg-input"
                              } inline-block h-5 w-5 transform rounded-full transition-transform`}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="order-emails"
                            className="flex flex-col"
                          >
                            <span>Order Updates</span>
                            <span className="text-sm text-muted-foreground">
                              Notifications about your order status
                            </span>
                          </label>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-muted">
                            <input
                              type="checkbox"
                              id="order-emails"
                              className="peer sr-only"
                              checked={
                                settings.notifications.email.orderUpdates
                              }
                              onChange={() =>
                                handleToggleChange(
                                  "notifications",
                                  "email",
                                  "orderUpdates"
                                )
                              }
                            />
                            <span
                              className={`${
                                settings.notifications.email.orderUpdates
                                  ? "translate-x-5 bg-primary"
                                  : "translate-x-0 bg-input"
                              } inline-block h-5 w-5 transform rounded-full transition-transform`}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="product-alert-emails"
                            className="flex flex-col"
                          >
                            <span>Product Alerts</span>
                            <span className="text-sm text-muted-foreground">
                              Price drops and back-in-stock notifications
                            </span>
                          </label>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-muted">
                            <input
                              type="checkbox"
                              id="product-alert-emails"
                              className="peer sr-only"
                              checked={
                                settings.notifications.email.productAlerts
                              }
                              onChange={() =>
                                handleToggleChange(
                                  "notifications",
                                  "email",
                                  "productAlerts"
                                )
                              }
                            />
                            <span
                              className={`${
                                settings.notifications.email.productAlerts
                                  ? "translate-x-5 bg-primary"
                                  : "translate-x-0 bg-input"
                              } inline-block h-5 w-5 transform rounded-full transition-transform`}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="new-arrivals-emails"
                            className="flex flex-col"
                          >
                            <span>New Arrivals</span>
                            <span className="text-sm text-muted-foreground">
                              Be the first to know about new products
                            </span>
                          </label>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-muted">
                            <input
                              type="checkbox"
                              id="new-arrivals-emails"
                              className="peer sr-only"
                              checked={settings.notifications.email.newArrivals}
                              onChange={() =>
                                handleToggleChange(
                                  "notifications",
                                  "email",
                                  "newArrivals"
                                )
                              }
                            />
                            <span
                              className={`${
                                settings.notifications.email.newArrivals
                                  ? "translate-x-5 bg-primary"
                                  : "translate-x-0 bg-input"
                              } inline-block h-5 w-5 transform rounded-full transition-transform`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Push Notifications */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Push Notifications</h3>
                      </div>

                      <div className="space-y-4 pl-7">
                        <div className="flex items-center justify-between">
                          <label htmlFor="order-push" className="flex flex-col">
                            <span>Order Updates</span>
                            <span className="text-sm text-muted-foreground">
                              Real-time updates about your orders
                            </span>
                          </label>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-muted">
                            <input
                              type="checkbox"
                              id="order-push"
                              className="peer sr-only"
                              checked={settings.notifications.push.orderUpdates}
                              onChange={() =>
                                handleToggleChange(
                                  "notifications",
                                  "push",
                                  "orderUpdates"
                                )
                              }
                            />
                            <span
                              className={`${
                                settings.notifications.push.orderUpdates
                                  ? "translate-x-5 bg-primary"
                                  : "translate-x-0 bg-input"
                              } inline-block h-5 w-5 transform rounded-full transition-transform`}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="promotions-push"
                            className="flex flex-col"
                          >
                            <span>Promotions</span>
                            <span className="text-sm text-muted-foreground">
                              Sales, discounts and special offers
                            </span>
                          </label>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-muted">
                            <input
                              type="checkbox"
                              id="promotions-push"
                              className="peer sr-only"
                              checked={settings.notifications.push.promotions}
                              onChange={() =>
                                handleToggleChange(
                                  "notifications",
                                  "push",
                                  "promotions"
                                )
                              }
                            />
                            <span
                              className={`${
                                settings.notifications.push.promotions
                                  ? "translate-x-5 bg-primary"
                                  : "translate-x-0 bg-input"
                              } inline-block h-5 w-5 transform rounded-full transition-transform`}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="stock-alerts-push"
                            className="flex flex-col"
                          >
                            <span>Stock Alerts</span>
                            <span className="text-sm text-muted-foreground">
                              Notifications when items are back in stock
                            </span>
                          </label>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-muted">
                            <input
                              type="checkbox"
                              id="stock-alerts-push"
                              className="peer sr-only"
                              checked={settings.notifications.push.stockAlerts}
                              onChange={() =>
                                handleToggleChange(
                                  "notifications",
                                  "push",
                                  "stockAlerts"
                                )
                              }
                            />
                            <span
                              className={`${
                                settings.notifications.push.stockAlerts
                                  ? "translate-x-5 bg-primary"
                                  : "translate-x-0 bg-input"
                              } inline-block h-5 w-5 transform rounded-full transition-transform`}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="reminders-push"
                            className="flex flex-col"
                          >
                            <span>Reminders</span>
                            <span className="text-sm text-muted-foreground">
                              Cart abandonment and browsing reminders
                            </span>
                          </label>
                          <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-muted">
                            <input
                              type="checkbox"
                              id="reminders-push"
                              className="peer sr-only"
                              checked={settings.notifications.push.reminders}
                              onChange={() =>
                                handleToggleChange(
                                  "notifications",
                                  "push",
                                  "reminders"
                                )
                              }
                            />
                            <span
                              className={`${
                                settings.notifications.push.reminders
                                  ? "translate-x-5 bg-primary"
                                  : "translate-x-0 bg-input"
                              } inline-block h-5 w-5 transform rounded-full transition-transform`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === "privacy" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    Privacy & Data Settings
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          Share Data for Analytics
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Allow anonymous usage data to improve our services
                        </p>
                      </div>
                      <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-muted">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={settings.privacy.shareDataForAnalytics}
                          onChange={() =>
                            setSettings((prev) => ({
                              ...prev,
                              privacy: {
                                ...prev.privacy,
                                shareDataForAnalytics:
                                  !prev.privacy.shareDataForAnalytics,
                              },
                            }))
                          }
                        />
                        <span
                          className={`${
                            settings.privacy.shareDataForAnalytics
                              ? "translate-x-5 bg-primary"
                              : "translate-x-0 bg-input"
                          } inline-block h-5 w-5 transform rounded-full transition-transform`}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Profile Visibility</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Control who can see your profile and reviews
                      </p>
                      <select
                        className="w-full rounded-md border border-border bg-background px-3 py-2"
                        value={settings.privacy.profileVisibility}
                        onChange={(e) =>
                          handleSelectChange(
                            "privacy",
                            "profileVisibility",
                            e.target.value
                          )
                        }
                      >
                        <option value="public">Public (Everyone)</option>
                        <option value="registered">
                          Registered Users Only
                        </option>
                        <option value="private">Private (Only Me)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Activity Tracking</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Allow tracking of your browsing activity for
                          personalized recommendations
                        </p>
                      </div>
                      <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-muted">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={settings.privacy.activityTracking}
                          onChange={() =>
                            setSettings((prev) => ({
                              ...prev,
                              privacy: {
                                ...prev.privacy,
                                activityTracking:
                                  !prev.privacy.activityTracking,
                              },
                            }))
                          }
                        />
                        <span
                          className={`${
                            settings.privacy.activityTracking
                              ? "translate-x-5 bg-primary"
                              : "translate-x-0 bg-input"
                          } inline-block h-5 w-5 transform rounded-full transition-transform`}
                        />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border">
                      <h3 className="font-medium mb-4">Data Management</h3>
                      <div className="space-y-4">
                        <Button variant="outline">Download My Data</Button>
                        <div>
                          <Button variant="destructive">Delete Account</Button>
                          <p className="text-xs text-muted-foreground mt-2">
                            This will permanently delete your account and all
                            associated data
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              )}

              {/* Preferences Settings */}
              {activeTab === "preferences" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    General Preferences
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Language</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Select your preferred language for the website
                      </p>
                      <select
                        className="w-full rounded-md border border-border bg-background px-3 py-2"
                        value={settings.preferences.language}
                        onChange={(e) =>
                          handleSelectChange(
                            "preferences",
                            "language",
                            e.target.value
                          )
                        }
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Bengali">Bengali</option>
                        <option value="Marathi">Marathi</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Currency</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Set your preferred currency for prices
                      </p>
                      <select
                        className="w-full rounded-md border border-border bg-background px-3 py-2"
                        value={settings.preferences.currency}
                        onChange={(e) =>
                          handleSelectChange(
                            "preferences",
                            "currency",
                            e.target.value
                          )
                        }
                      >
                        <option value="INR">Indian Rupee (₹)</option>
                        <option value="USD">US Dollar ($)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="GBP">British Pound (£)</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Theme</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Choose your preferred appearance
                      </p>
                      <select
                        className="w-full rounded-md border border-border bg-background px-3 py-2"
                        value={settings.preferences.theme}
                        onChange={(e) =>
                          handleSelectChange(
                            "preferences",
                            "theme",
                            e.target.value
                          )
                        }
                      >
                        <option value="system">System Default</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              )}

              {/* Payment Methods */}
              {activeTab === "payment" && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">
                    Payment Methods
                  </h2>

                  <div className="space-y-6">
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-6 bg-blue-600 rounded mr-3 flex items-center justify-center text-black text-xs font-bold">
                            VISA
                          </div>
                          <div>
                            <p className="font-medium">•••• •••• •••• 4242</p>
                            <p className="text-sm text-muted-foreground">
                              Expires 09/2025
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs py-0.5 px-2 bg-primary/10 text-primary rounded-full">
                            Default
                          </span>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-6 bg-red-500 rounded mr-3 flex items-center justify-center text-black text-xs font-bold">
                            MC
                          </div>
                          <div>
                            <p className="font-medium">•••• •••• •••• 5678</p>
                            <p className="text-sm text-muted-foreground">
                              Expires 07/2024
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            Make Default
                          </Button>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">Add New Payment Method</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
