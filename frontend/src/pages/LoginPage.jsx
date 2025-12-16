import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardFooter, CardAction } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { GoogleIcon } from '../assets/GoogleIcon';

const LoginPage = () => {
    const [email, setEmail ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }


    const handleGoogleLogin = () => {
        // Redirect ke backend OAuth endpoint
        window.location.href = 'http://localhost:5000/api/auth/google';
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4 pb-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
                <h2 className='text-primary'>Banyuwangi</h2>
            </div>
          </div>

          {/* Title */}
          <CardTitle>
            <h4 className='text-primary'> Welcome</h4>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email address*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>

            {/* Continue Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-secondary text-background font-medium"
            >
              Continue
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full h-12 border-gray-300 hover:bg-primary"
          >
            <GoogleIcon />
            Continue with Google
          </Button>
        </CardContent>

        <CardFooter className="text-center text-xs text-primary">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </CardFooter>
      </Card>
    </div>
    );
}

export default LoginPage;