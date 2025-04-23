"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  User,
  Mail,
  Phone,
  Calendar,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

// Simulated user data
const initialUserData = {
  name: "Himank",
  email: "himank@example.com",
  phone: "+91 9876543210",
  dateOfBirth: "1990-06-15",
  avatar:
    "https://unsplash.com/photos/a-person-standing-in-front-of-a-white-wall-KHO_jvR6HkA",
  joinedDate: "March 2023",
  gender: "Male",
  location: "New Delhi, India",
};

export default function ProfilePage() {
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialUserData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

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
        <span className="text-foreground font-medium">Profile</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative group mb-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary">
                    <Image
                      src={userData.avatar}
                      alt={userData.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full bg-background/80 backdrop-blur-sm"
                    >
                      <Camera className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {userData.email}
                </p>
                <p className="text-muted-foreground text-xs mt-2">
                  Member since {userData.joinedDate}
                </p>

                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="mt-6 w-full"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p>{userData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Date of Birth
                      </p>
                      <p>
                        {new Date(userData.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-muted-foreground mr-3" />
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p>{userData.gender}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Form */}
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {isEditing ? "Edit Profile" : "Profile Information"}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Full Name
                          </label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Email Address
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Phone Number
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Date of Birth
                          </label>
                          <Input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Gender
                          </label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-border bg-background px-3 py-2"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">
                              Prefer not to say
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Location
                          </label>
                          <Input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-4 mt-6">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                      </div>
                    </>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </h3>
                        <p className="mt-1">{userData.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Email Address
                        </h3>
                        <p className="mt-1">{userData.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Phone Number
                        </h3>
                        <p className="mt-1">{userData.phone}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Date of Birth
                        </h3>
                        <p className="mt-1">
                          {new Date(userData.dateOfBirth).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Gender
                        </h3>
                        <p className="mt-1">{userData.gender}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Location
                        </h3>
                        <p className="mt-1">{userData.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Security</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Password</h3>
                      <p className="text-sm text-muted-foreground">
                        Last updated 3 months ago
                      </p>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security
                      </p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
