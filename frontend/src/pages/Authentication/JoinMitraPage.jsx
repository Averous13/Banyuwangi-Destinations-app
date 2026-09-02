import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/contexts/authContext';
import { ChevronRight, ChevronLeft, User, Briefcase, Home, Check } from 'lucide-react';
import { MITRA_FORM_STEPS } from '@/config/form/mitraField';
import FormSection from '@/components/form/FormSection';
import { validateStep } from '@/utils/stepValidate';

const STEP_ICONS = [User, Briefcase]

const StepIndicator = ({ current }) => (
  <div className="flex items-center justify-center gap-2 mb-6">
    {MITRA_FORM_STEPS.map((step, idx) => {
      const Icon     = STEP_ICONS[idx];
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
            {idx < MITRA_FORM_STEPS.length - 1 && (
                <div className={`h-0.5 w-10 sm:w-16 mb-4 transition-all duration-300
                    ${current > step.id ? 'bg-primary' : 'bg-border'}`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

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

  const currentStepConfig = MITRA_FORM_STEPS.find(s => s.id === step)

  const handleChange = (e) => {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    setStepError('');
  }

  const handleNext = () => {
    const err = validateStep(currentStepConfig, formData);
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
    for (const stepConfig of MITRA_FORM_STEPS) {
      const err = validateStep(stepConfig, formData);
      if (err) {setStepError(err); return;}
    }
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

    return (
      <div className='min-h-screen flex items-center justify-center bg-primary p-4 py-10'>
        <Card className='w-full max-w-lg'>
          <CardHeader className='text-center pb-2'>
            <CardTitle>
              <h3 className='text-primary'>Daftar Akun Mitra</h3>
            </CardTitle>
            <p className='text-sm text-muted-foreground mt-1'>
              Langkah {step} dari {MITRA_FORM_STEPS.length} - {currentStepConfig.label}
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
                    <FormSection step={currentStepConfig} data={formData} onChange={handleChange} error={stepError} />
                  </div>

                  <div className={`flex mt-6 gap-3 ${step > 1 ? 'justify-between' : 'justify-end'}`}>
                    {step > 1 && (
                      <Button type='button' variant='outline' onClick={handleBack} disabled={loading} className='flex items-center gap-2'>
                        <ChevronLeft className='w-4 h-4'/> Kembali
                      </Button>
                    )}
                    {step < MITRA_FORM_STEPS.length ? (
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
