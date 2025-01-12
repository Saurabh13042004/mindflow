import React, { useState, useContext } from "react";
import axios from "axios";
import { registerUser } from '../api/users';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'react-hot-toast';
export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {name, email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData({
      ...formData,
      [name]: value, // Update the specific field in formData
    });
    setError("");
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      setIsLoading(true);
      toast.loading('Creating account...');
      const response = await registerUser(formData);
      toast.dismiss();
      toast.success('Registration successful! You can now log in.');
      setSuccess("Registration successful! You can now log in.");
      if(response.status==201) {
        setTimeout(() => navigate('/login'), 2000);
      }
      setError("");

    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "An error occurred. Please try again.");
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      toast.dismiss();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-semibold">MindFlow</h1>
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Get started with MindFlow today</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name" 
                  placeholder="John Doe"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full text-white">Create Account</Button>
            </form>
            
            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/signin" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}