import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Save, Lock, Shield, AlertCircle, CheckCircle, Mail, Timer, RefreshCw } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const SecuritySettings = () => {
    const { updatePassword, requestPasswordResetOTP, user } = useAuth();
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        otp: ''
    });
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0 && otpSent) {
            setOtpSent(false);
        }
        return () => clearTimeout(timer);
    }, [countdown, otpSent]);

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleRequestOTP = async () => {
        if (!passwords.currentPassword) {
            toast.error('Please enter your current password first');
            return;
        }

        setOtpLoading(true);
        try {
            const result = await requestPasswordResetOTP();
            if (result.success) {
                toast.success('Verification code sent to your email!');
                setOtpSent(true);
                setCountdown(600); // 10 minutes in seconds
            } else {
                toast.error(result.message || 'Failed to send verification code');
            }
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setOtpLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otpSent) {
            toast.error('Please request a verification code first');
            return;
        }

        if (!passwords.otp) {
            toast.error('Please enter the verification code');
            return;
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

        if (passwords.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            const result = await updatePassword(
                passwords.currentPassword,
                passwords.newPassword,
                passwords.otp
            );
            if (result.success) {
                toast.success('Password updated successfully');
                setPasswords({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                    otp: ''
                });
                setOtpSent(false);
                setCountdown(0);
            } else {
                toast.error(result.message || 'Failed to update password');
            }
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="p-6 bg-zinc-950 min-h-screen text-white pt-24">
            <Toaster position="top-right" />
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Lock className="text-orange-500" />
                        Security Settings
                    </h1>
                    <p className="text-zinc-400 mt-2">Manage your account security and password</p>
                </div>

                <div className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-zinc-800 bg-zinc-900/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                                <Shield className="text-orange-500" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">{user?.name || 'Administrator'}</h3>
                                <p className="text-sm text-zinc-500">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 flex items-start gap-3">
                            <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={18} />
                            <div className="text-sm text-zinc-300">
                                <p className="font-semibold mb-1">Two-Step Verification Required</p>
                                <p className="text-xs text-zinc-400">
                                    For security, we'll send a verification code to your email before changing your password.
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Current Password</label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={passwords.currentPassword}
                                onChange={handleChange}
                                required
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                                placeholder="Enter your current password"
                            />
                        </div>

                        <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Mail className="text-orange-500" size={18} />
                                    <span className="text-sm font-semibold">Email Verification</span>
                                </div>
                                {otpSent && countdown > 0 && (
                                    <div className="flex items-center gap-2 text-xs text-orange-400">
                                        <Timer size={14} />
                                        Expires in {formatTime(countdown)}
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={handleRequestOTP}
                                disabled={otpLoading || (otpSent && countdown > 0)}
                                className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-zinc-700 disabled:text-zinc-500 px-4 py-2.5 rounded-lg font-semibold transition-all"
                            >
                                {otpLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                                        Sending Code...
                                    </>
                                ) : otpSent && countdown > 0 ? (
                                    <>
                                        <CheckCircle size={18} />
                                        Code Sent to {user?.email}
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw size={18} />
                                        {otpSent ? 'Resend Verification Code' : 'Send Verification Code'}
                                    </>
                                )}
                            </button>

                            {otpSent && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                                        Verification Code (6 digits)
                                    </label>
                                    <input
                                        type="text"
                                        name="otp"
                                        value={passwords.otp}
                                        onChange={handleChange}
                                        required
                                        maxLength={6}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 outline-none transition-all text-center text-2xl tracking-widest font-mono"
                                        placeholder="000000"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwords.newPassword}
                                    onChange={handleChange}
                                    required
                                    disabled={!otpSent}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Minimum 6 characters"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwords.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    disabled={!otpSent}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-orange-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Repeat new password"
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                                <AlertCircle size={14} />
                                Changing your password will not end your current session.
                            </div>
                            <button
                                type="submit"
                                disabled={loading || !otpSent}
                                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-zinc-700 disabled:text-zinc-500 px-6 py-2.5 rounded-lg font-semibold transition-all shadow-lg shadow-orange-950/20"
                            >
                                {loading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                                ) : (
                                    <Save size={18} />
                                )}
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-8 p-4 bg-orange-500/5 rounded-xl border border-orange-500/10 flex items-start gap-3">
                    <CheckCircle className="text-orange-500 shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-zinc-400">
                        Password hashing and email verification are enabled. Your password is encrypted before being stored in our database.
                        Always use a strong, unique password for your administrator account.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;
