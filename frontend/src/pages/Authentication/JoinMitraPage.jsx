import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthContext } from '@/contexts/authContext';
import { ChevronRight, ChevronLeft, User, Briefcase, Home, Check } from 'lucide-react';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "../../components/ui/select";

const STEPS = [
    { id: 1, label: 'Data Pribadi',  icon: User },
    { id: 2, label: 'Data Mitra',    icon: Briefcase }
];

const BANK_TYPES = [
    { value: 'BCA',   label: 'BCA' },
    { value: 'BRI', label: 'BRI' },
    { value: 'BNI',      label: 'BNI' },
    { value: 'Mandiri',      label: 'Mandiri' },
    { value: 'BSI',        label: 'BSI' },
    { value: 'Permata',        label: 'Permata' },
    { value: 'Danamon',        label: 'Danamon' },
    { value: 'Prima',        label: 'Prima' },
    { value: 'CIMB Niaga',        label: 'CIMB Niaga' },
];

const BUSINESS_TYPES = [
    { value: 'penginapan',   label: 'Penginapan' },
    { value: 'tour_guide',   label: 'Tour Guide' },
    { value: 'restoran',     label: 'Restoran / Kuliner' },
    { value: 'oleh_oleh',    label: 'Toko Oleh-oleh' },
    { value: 'transportasi', label: 'Transportasi' },
    { value: 'lainnya',      label: 'Lainnya' },
];

const StepIndicator = ({ current }) => (
    <div className="flex items-center justify-center gap-2 mb-6">
        {STEPS.map((step, idx) => {
            const Icon     = step.icon;
            const isDone   = current > step.id;
            const isActive = current === step.id;
            return (
                <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center gap-1">
                        <div className={`
                            w-9 h-9 rounded-full flex items-center justify-center
                            border-2 transition-all duration-300
                            ${isDone   ? 'bg-primary border-primary text-primary-foreground' : ''}
                            ${isActive ? 'border-primary text-primary bg-background'         : ''}
                            ${!isDone && !isActive ? 'border-border text-muted-foreground bg-background' : ''}
                        `}>
                            {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                        </div>
                        <span className={`text-xs font-medium hidden sm:block
                            ${isActive ? 'text-primary' : 'text-muted-foreground'}
                        `}>{step.label}</span>
                    </div>
                    {idx < STEPS.length - 1 && (
                        <div className={`h-0.5 w-10 sm:w-16 mb-4 transition-all duration-300
                            ${current > step.id ? 'bg-primary' : 'bg-border'}`} />
                    )}
                </React.Fragment>
            );
        })}
    </div>
);

const Section1 = ({ data, onChange, error }) => (
    <div className='space-y-4'>
        <p className='text-sm text-muted-foreground mb-2'>
            Isi data diri Anda sebagai pemilik akun
        </p>
        {error && (<div className='text-sm tex-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3'>{error} </div>)}
        <Input name="name" type='text' placeholder='Nama lengkap' value={data.name} onChange={onChange} className='h-12' required/>
        <Input name="email" type='email' placeholder='Email*' value={data.email} onChange={onChange} className='h-12' required/>
        <Input name="alamat" type='text' placeholder='Alamat*' value={data.alamat} onChange={onChange} className='h-12' required/>
        <Input name="phone" type='tel' placeholder='Nomor HP/ WhatsApp*' value={data.phone} onChange={onChange} className='h-12' required/>
        <Input name="password" type='password' placeholder='Password* (min. 8 karakter)' value={data.password} onChange={onChange} className='h-12' required minLength={8}/>
        <Input name="confirmPassword" type='password' placeholder='confirmPassword* (min. 8 karakter)' value={data.confirmPassword} onChange={onChange} className='h-12' required minLength={8}/>
    </div>
)

const Section2 = ({ data, onChange, error }) => (
    <div className='space-y-4'>
        <p className='text-sm text-muted-foreground mb-2'>
            Informasi usaha Anda yang akan ditampilkan di platform
        </p>
        {error && (<div className='text-sm tex-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3'>{error} </div>)}
        <Input name="business_name" type='text' placeholder='Nama usaha' value={data.business_name} onChange={onChange} className='h-12' required/>
        
        <Input name="ktp_number" type='text' placeholder='Nomor KTP(NIK)*' value={data.ktp_number} onChange={onChange} className='h-12' required minLength={16}/>
        <Input name="npwp_number" type='text' placeholder='NPWP*' value={data.npwp_number} onChange={onChange} className='h-12' required minLength={15}/>
        
        <div className='grid grid-cols-2 gap-2'>
            <Select name="business_type" value={data.business_type} required
                    onValueChange={(value) =>
                        onChange({
                            target: {
                                name: "business_type",
                                value,
                            },
                        })
                    }>
                
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Pilih tipe usaha" />
                </SelectTrigger>
                <SelectContent>
                    {BUSINESS_TYPES.map(bt => (
                        <SelectItem value={bt.value} key={bt.value}>
                            {bt.label}
                        </SelectItem>))}
                </SelectContent>
            </Select>
            <Select name="bank_name" value={data.bank_name}  required
                    onValueChange={(value) =>
                        onChange({
                            target: {
                                name: "bank_name",
                                value,
                            },
                        })
                    }>
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Pilih Bank" />
                </SelectTrigger>
                <SelectContent>
                    {BANK_TYPES.map(bank => (
                        <SelectItem value={bank.value} key={bank.value}>
                            {bank.label}
                        </SelectItem>))}
                </SelectContent>
            </Select>
        </div>
        <Input name="bank_account_number" type='text' placeholder='No rekening' value={data.bank_account_number} onChange={onChange} className='h-12' required minLength={8}/>
        <Input name="bank_account_holder" type='text' placeholder='Nama rekening' value={data.bank_account_holder} onChange={onChange} className='h-12' required/>
    </div>
)


const validateStep = (step, data) => {
    if (step === 1){
        if (!data.name || !data.email || !data.phone || !data.password) return 'Semua field bertanda* wajib diisi.';
        if(data.password.length < 8) return "Password minimal terdiri dari 8 karakter";
        if(data.password !== data.confirmPassword) return "Password dan konfirmasi password tidak sesuai";
    }

    if (step === 2){
        if(!data.business_name || !data.business_type || !data.npwp_number || !data.ktp_number) return 'Semua field bertanda* wajib diisi.';
        if(!data.bank_name || !data.bank_account_holder || !data.bank_account_number) return "Lengkapi data bank finansial anda"
    }

    if (step === 3){
        if(!data.name) return "sek nyusul yo gae ngelengkapi e";
    }


}

const JoinMitraPage = () => {
    const [step, setStep ] = useState(1);
    const [stepError, setStepError ] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

        const [formData, setFormData] = useState({
        name: '', email: '', phone: '', password: '', confirmPassword: '',
        business_name: '', business_type: '', owner_address: '', owner_district: '',
        bio: '', bank_name: '', bank_account_number: '', bank_account_holder: '',
    });

    const {register} = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
        setStepError('');
    }

    const handleNext = () => {
        const err = validateStep(step, formData);
        if (err) { setStepError(err); return;}
        setStepError('');
        setStep(s => s + 1)
    }

    const handleBack = () => {
        setStepError('');
        setStep(s => s - 1)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = validateStep(3, formData);
        if (err) {setStepError(err); return;}
        setLoading(true);
        setStepError('');
        try {
            const result = await register(formData, 'mitra');
            setSuccess(result.message || 'Pendaftaran berhasil! Menunggu verifikasi admin. Anda akan mendapatkan notifikasi melalui email.');
            setTimeout(() => navigate('/login'), 3000)
        } catch (err) {
            setStepError(err.response?.data?.message || 'Registrasi anda gagal, coba lagi')
        } finally {
            setLoading(false)
        }
    }

    const sectionTitles = ['Data Pribadi', 'Data Mitra'];

    return (
        <div className='min-h-screen flex items-center justify-center bg-primary p-4 py-10'>
            <Card className='w-full max-w-lg'>
                <CardHeader className='text-center pb-2'>
                    <CardTitle>
                        <h3 className='text-primary'>Daftar Akun Mitra</h3>
                    </CardTitle>
                    <p className='text-sm text-muted-foreground mt-1'>
                        Langkah {step} dari {STEPS.length} - {sectionTitles[step - 1]}
                    </p>
                </CardHeader>

                <CardContent className='pt-4'>
                    <StepIndicator current={step}/>
                        {success && (
                            <div className='text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-4 py-3 mb-4'>
                                {success}
                                <span className='block text-xs mt-1 text-green-600'>Mengarahkan ke halaman login...</span>
                            </div>
                        )}

                        {!success && (
                            <form onSubmit={handleSubmit}>
                                <div key={step} className='animate-in fade-in slide-in-from-right-4 duration-300'>
                                    {step === 1 && <Section1 data={formData} onChange={handleChange} error={stepError}/>}
                                    {step === 2 && <Section2 data={formData} onChange={handleChange} error={stepError}/>}
                                </div>

                                <div className={`flex mt-6 gap-3 ${step > 1 ? 'justify-between' : 'justify-end'}`}>
                                    {step > 1 && (
                                        <Button type='button' variant='outline' onClick={handleBack} disabled={loading} className='flex items-center gap-2'>
                                            <ChevronLeft className='w-4 h-4'/> Kembali
                                        </Button>
                                    )}
                                    {step < STEPS.length ? (
                                        <Button type='button' onClick={handleNext} className='flex items-center gap-2 bg-primary hover:bg-accent text-background'>
                                            Lanjut <ChevronRight className='w-4 h-4'/>
                                        </Button>
                                    ): (
                                        <Button type='submit' disabled={loading} className='flex items-center gap-2 bg-primary hover:bg-accent text-background'>
                                            {loading ? 'Mendaftar...' : 'Daftar sebagai Mitra'}
                                        </Button>
                                    )}
                                </div>
                            </form>
                        )}
                </CardContent>

                <CardFooter className="flex flex-col gap-2 text-center text-sm">
                    <p className="text-primary">
                        Sudah punya akun?{' '}
                        <Link to="/login" className="font-medium underline">Masuk</Link>
                    </p>
                    <p className="text-primary">
                        Daftar sebagai wisatawan?{' '}
                        <Link to="/register" className="font-medium underline">Daftar biasa</Link>
                    </p>
                </CardFooter>
            </Card>

        </div>
    )
}

export default JoinMitraPage;