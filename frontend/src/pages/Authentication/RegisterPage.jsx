import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardFooter} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoogleIcon } from '@/assets/GoogleIcon';
import { AuthContext } from '@/contexts/authContext';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async (e) =>  {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Password dan konfirmasi password tidak cocok!');
            return;
        }

        setError('');
        setLoading(true);



        try {
            await register(formData, 'user');
            navigate('/')
        } catch (err) {
            console.log(err.response.data)
            const message = err.response?.data?.message || 'registrasi gagal, Coba lagi!';
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    const handleGoogleLogin = () => {
        // Redirect ke backend OAuth endpoint
        window.location.href = 'http://localhost:5000/api/auth/google';
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center p-6">
                    <CardTitle>
                        <h3 className='text-primary'>Daftar Akun</h3>
                    </CardTitle>

                {/* Google Sign In Button */}
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleLogin}
                    className="w-full h-12 bg-primary hover:bg-secondary text-background"
                    >
                    <GoogleIcon />
                    Continue with Google
                </Button>
                        

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or</span>
                    </div>
                </div>
                </CardHeader>



                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="text-sm text-red-600 bg-red-50 border border-b-red-200 rounded-md px-4 py-3">
                                {error}
                            </div>
                        )}

                        <Input 
                            type="text"
                            name="name"
                            placeholder="Nama lengkap*"
                            value={formData.name}
                            onChange={handleChange}
                            className="h-12"
                            required
                            disabled={loading}
                        />

                        <Input 
                            type="email"
                            name="email"
                            placeholder="Email*"
                            value={formData.email}
                            onChange={handleChange}
                            className="h-12"
                            required
                            disabled={loading}
                        />

                        <Input 
                            type="phone"
                            name="phone"
                            placeholder="Phone number*"
                            value={formData.phone}
                            onChange={handleChange}
                            className="h-12"
                            required
                            disabled={loading}
                        />

                        <Input
                            name="password"
                            type="password"
                            placeholder="Password* (min. 8 karakter)"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                            disabled={loading}
                            className="h-12"
                        />

                        <Input
                            name="confirmPassword"
                            type="password"
                            placeholder="Konfirmasi Password*"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength={8}
                            disabled={loading}
                            className="h-12"
                        />

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-primary hover:bg-secondary text-background"
                        >
                            {loading ? 'Mendaftar...' : 'Daftar'}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-2 text-center text-sm">
                    <p className="text-primary">
                        Sudah punya akun?{' '}
                        <Link to="/login" className="font-medium underline">Masuk</Link>
                    </p>
                    <p className="text-primary">
                        Punya properti untuk didaftarkan?{' '}
                        <Link to="/register/mitra" className="font-medium underline">Daftar sebagai Mitra</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )

}

export default RegisterPage;