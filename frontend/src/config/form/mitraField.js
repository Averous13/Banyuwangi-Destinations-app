// config/mitraFormFields.js
export const MITRA_FORM_STEPS = [
    {
        id: 1,
        label: 'Data Pribadi',
        description: 'Isi data diri Anda sebagai pemilik akun',
        fields: [
            { name: 'name', type: 'text', placeholder: 'Nama lengkap', required: true },
            { name: 'email', type: 'email', placeholder: 'Email*', required: true },
            { name: 'alamat', type: 'text', placeholder: 'Alamat*', required: true },
            { name: 'phone', type: 'tel', placeholder: 'Nomor HP/ WhatsApp*', required: true },
            { name: 'password', type: 'password', placeholder: 'Password* (min. 8 karakter)', required: true, minLength: 8 },
            { name: 'confirmPassword', type: 'password', placeholder: 'confirmPassword* (min. 8 karakter)', required: true, minLength: 8 },
        ],
        // validasi tambahan yang tidak bisa direpresentasikan per-field (misal cross-field check)
        customValidate: (data) => {
            if (data.password !== data.confirmPassword) {
                return 'Password dan konfirmasi password tidak sesuai';
            }
            return null;
        },
    },
    {
        id: 2,
        label: 'Data Mitra',
        description: 'Informasi usaha Anda yang akan ditampilkan di platform',
        fields: [
            { name: 'business_name', type: 'text', placeholder: 'Nama usaha', required: true },
            { name: 'ktp_number', type: 'text', placeholder: 'Nomor KTP(NIK)*', required: true, minLength: 16 },
            { name: 'npwp_number', type: 'text', placeholder: 'NPWP*', required: true, minLength: 15 },
            {
                name: 'business_type', type: 'select', placeholder: 'Pilih tipe usaha', required: true,
                optionsKey: 'BUSINESS_TYPES', layout: 'half',
            },
            {
                name: 'bank_name', type: 'select', placeholder: 'Pilih Bank', required: true,
                optionsKey: 'BANK_TYPES', layout: 'half',
            },
            { name: 'bank_account_number', type: 'text', placeholder: 'No rekening', required: true, minLength: 8 },
            { name: 'bank_account_holder', type: 'text', placeholder: 'Nama rekening', required: true },
        ],
    },
];