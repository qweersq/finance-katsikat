import { useState, useEffect, useContext } from 'react';
import { fetchData, postData } from '../../../services/api';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { GeneralContext } from '../../../contexts/GeneralContext';
import { DashboardContext } from '../contexts/DashboardContext';

const AddExpenseModal = ({ isOpen, onClose, onSuccess }) => {
    const { getProfile } = useContext(GeneralContext);
    console.log("getProfile", getProfile);
    const [formData, setFormData] = useState({
        user_id: getProfile?.id,
        finance_account_id: '',
        finance_category_id: '',
        name: '',
        amount: '',
        description: '',
        payment_method: 'cash',
        date: new Date(),
        receipt: null,
        status: 'pending'
    });
    const { financeAccounts: hookAccounts, financeCategories: hookCategories, loadDashboard } = useContext(DashboardContext);
    const [accounts, setAccounts] = useState(hookAccounts);
    const [categories, setCategories] = useState(hookCategories.filter(category => category.type === 'debit'));
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setFormData(prev => ({ ...prev, user_id: getProfile?.id }));
    }, [getProfile]);

    useEffect(() => {
        setAccounts(hookAccounts);
        setCategories(hookCategories.filter(category => category.type === 'debit'));
    }, [hookAccounts, hookCategories]);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log("file", file);
        if (file) {
            setFormData(prev => ({ ...prev, receipt: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            console.log("formData", formData);
            const formDataToSend = {
                ...formData,
                receipt: '',
            }
            await postData('/expenses', formDataToSend);
            onSuccess?.();
            onClose();
            loadDashboard();
            setFormData({
                user_id: getProfile?.id,
                finance_account_id: '',
                finance_category_id: '',
                name: '',
                amount: '',
                description: '',
                payment_method: 'cash',
                date: new Date(),
                receipt: null,
                status: 'pending'
            });
        } catch (err) {
            setError(err.message || 'Failed to add expense');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop with better scroll handling */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                onClick={onClose}
            />

            {/* Modal Container with proper positioning and scroll */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
                    {/* Modal Content */}
                    <div
                        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl transform transition-all max-h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header - Static */}
                        <div className="flex-none p-6 pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                        Add Expense
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Create new expense transaction
                                    </p>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
                                >
                                    <svg
                                        className="w-5 h-5 text-gray-400 group-hover:text-gray-800 transition-colors duration-200"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {error && (
                                <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-shrink-0">
                                            <svg
                                                className="h-5 w-5 text-red-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-sm text-red-600 font-medium">
                                            {error}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                        </div>

                        {/* Form Content - Scrollable */}
                        <div className="flex-1 overflow-y-auto px-6 pb-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative">
                                    <label className="block text-sm font-medium mb-1.5 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                        Name
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <svg
                                                className="h-5 w-5 text-gray-400 group-hover:text-sky-500 transition-colors duration-200"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            className="w-full pl-11 pr-4 py-2.5 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl
                                                focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 
                                                hover:border-gray-300 transition-colors duration-200
                                                placeholder:text-gray-400 placeholder:text-sm"
                                            placeholder="Enter expense name..."
                                        />
                                        {formData.name && (
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                <svg
                                                    className="h-5 w-5 text-green-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-1.5 text-xs text-gray-500">
                                        Enter a clear and descriptive name for the expense
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium mb-1.5 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                        From Account
                                    </label>

                                    <div className="grid grid-cols-2 gap-3">
                                        {accounts.map(account => (
                                            <div
                                                key={account.id}
                                                onClick={() => setFormData(prev => ({ ...prev, finance_account_id: account.id }))}
                                                className={`relative cursor-pointer rounded-xl p-3 transition-all duration-200 
                                                    ${formData.finance_account_id === account.id
                                                        ? 'bg-sky-50 border-2 border-sky-500 shadow-sm'
                                                        : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {/* Selected Indicator */}
                                                {formData.finance_account_id === account.id && (
                                                    <div className="absolute top-2 right-2">
                                                        <div className="bg-sky-500 rounded-full p-1">
                                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Account Icon */}
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2
                                                    ${formData.finance_account_id === account.id
                                                        ? 'bg-sky-500 text-white'
                                                        : 'bg-white text-gray-500'
                                                    }`}
                                                >
                                                    {account.type === 'bank' ? (
                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                                            />
                                                        </svg>
                                                    ) : account.type === 'cash' ? (
                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                                            />
                                                        </svg>
                                                    )}
                                                </div>

                                                {/* Account Details */}
                                                <div>
                                                    <h4 className={`font-medium text-sm mb-0.5
                                                        ${formData.finance_account_id === account.id ? 'text-sky-700' : 'text-gray-700'}`}
                                                    >
                                                        {account.name}
                                                    </h4>
                                                    <div className="flex items-center gap-1">
                                                        <span className={`text-xs ${formData.finance_account_id === account.id ? 'text-sky-600' : 'text-gray-500'}`}>
                                                            Balance:
                                                        </span>
                                                        <span className={`text-xs font-medium ${formData.finance_account_id === account.id ? 'text-sky-700' : 'text-gray-600'}`}>
                                                            {new Intl.NumberFormat('id-ID', {
                                                                style: 'currency',
                                                                currency: 'IDR',
                                                                minimumFractionDigits: 0,
                                                                maximumFractionDigits: 0
                                                            }).format(account.balance)}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Hover Effect Overlay */}
                                                <div className={`absolute inset-0 rounded-xl transition-opacity duration-200
                                                    ${formData.finance_account_id === account.id
                                                        ? 'opacity-0'
                                                        : 'bg-gray-900 opacity-0 hover:opacity-5'
                                                    }`}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Helper Text */}
                                    <div className="mt-1.5 text-xs text-gray-500 flex items-center gap-1">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Select an account for this expense transaction
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium mb-1.5 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                        Category
                                    </label>

                                    <div className="grid grid-cols-3 gap-2.5 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                                        {categories.map(category => (
                                            <div
                                                key={category.id}
                                                onClick={() => setFormData(prev => ({ ...prev, finance_category_id: category.id }))}
                                                className={`relative group cursor-pointer rounded-xl transition-all duration-200 
                                                    ${formData.finance_category_id === category.id
                                                        ? 'ring-2 ring-sky-500 bg-sky-50'
                                                        : 'hover:bg-gray-50 border border-gray-200'
                                                    }`}
                                            >
                                                {/* Category Card Content */}
                                                <div className="p-3">
                                                    {/* Icon Container */}
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-colors
                                                        ${formData.finance_category_id === category.id
                                                            ? 'bg-sky-500 text-white'
                                                            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        {/* Dynamic icons based on category type */}
                                                        {category.type === 'food' ? (
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                            </svg>
                                                        ) : category.type === 'transport' ? (
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2M7 7h10" />
                                                            </svg>
                                                        )}
                                                    </div>

                                                    {/* Category Name */}
                                                    <span className={`block text-sm font-medium truncate transition-colors
                                                        ${formData.finance_category_id === category.id
                                                            ? 'text-sky-700'
                                                            : 'text-gray-700 group-hover:text-gray-900'
                                                        }`}
                                                    >
                                                        {category.name}
                                                    </span>

                                                    {/* Selected Indicator */}
                                                    {formData.finance_category_id === category.id && (
                                                        <div className="absolute top-2 right-2 w-4 h-4">
                                                            <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500 text-white items-center justify-center">
                                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Quick Tag */}
                                                    <div className={`mt-1.5 inline-flex items-center rounded-full px-2 py-0.5 text-xs
                                                        ${formData.finance_category_id === category.id
                                                            ? 'bg-sky-100 text-sky-700'
                                                            : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        <span className="truncate max-w-[80px]">
                                                            {category.type}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Hover Effect */}
                                                <div className={`absolute inset-0 rounded-xl transition-opacity duration-200
                                                    ${formData.finance_category_id === category.id
                                                        ? 'opacity-0'
                                                        : 'bg-gradient-to-b from-transparent to-gray-50 opacity-0 group-hover:opacity-100'
                                                    }`}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Helper Text */}
                                    <div className="mt-2 flex items-start gap-1.5">
                                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="text-xs text-gray-500">
                                            Choose a category to help organize and track your expenses better
                                        </span>
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium mb-1.5 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                        Payment Method
                                    </label>

                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            {
                                                value: 'cash',
                                                label: 'Cash',
                                                icon: (
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                                        />
                                                    </svg>
                                                ),
                                                bgColor: 'bg-green-500'
                                            },
                                            {
                                                value: 'bank_transfer',
                                                label: 'Bank Transfer',
                                                icon: (
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                                        />
                                                    </svg>
                                                ),
                                                bgColor: 'bg-blue-500'
                                            },
                                            {
                                                value: 'qris',
                                                label: 'QRIS',
                                                icon: (
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                ),
                                                bgColor: 'bg-purple-500'
                                            }
                                        ].map(method => (
                                            <div
                                                key={method.value}
                                                onClick={() => setFormData(prev => ({ ...prev, payment_method: method.value }))}
                                                className={`relative group cursor-pointer transition-all duration-200 
                                                    ${formData.payment_method === method.value
                                                        ? 'scale-105 transform'
                                                        : 'hover:scale-105 transform'
                                                    }`}
                                            >
                                                {/* Card */}
                                                <div className={`
                                                    relative p-4 rounded-xl border-2 transition-all duration-200
                                                    ${formData.payment_method === method.value
                                                        ? 'border-sky-500 bg-sky-50'
                                                        : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                                                    }
                                                `}>
                                                    {/* Icon */}
                                                    <div className={`
                                                        w-10 h-10 rounded-full flex items-center justify-center mb-3
                                                        ${formData.payment_method === method.value
                                                            ? `${method.bgColor} text-white`
                                                            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                                                        }
                                                    `}>
                                                        {method.icon}
                                                    </div>

                                                    {/* Label */}
                                                    <div className="text-sm font-medium text-center">
                                                        {method.label}
                                                    </div>

                                                    {/* Selected Indicator */}
                                                    {formData.payment_method === method.value && (
                                                        <div className="absolute -top-2 -right-2">
                                                            <div className="bg-sky-500 rounded-full p-1.5">
                                                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Hover Effect */}
                                                    <div className={`
                                                        absolute inset-0 rounded-xl transition-opacity duration-200
                                                        ${formData.payment_method === method.value
                                                            ? 'opacity-0'
                                                            : 'opacity-0 group-hover:opacity-100 bg-gradient-to-t from-gray-50 to-transparent'
                                                        }
                                                    `} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Helper Text */}
                                    <div className="mt-2 flex items-start gap-1.5">
                                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="text-xs text-gray-500">
                                            Select how you want to process this payment
                                        </span>
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium mb-1.5 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                        Amount
                                    </label>

                                    <div className="relative group">
                                        {/* Currency Badge */}
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 bg-gray-100 rounded-lg px-2 py-1">
                                            <span className="text-sm font-semibold text-gray-600">Rp</span>
                                        </div>

                                        {/* Amount Input */}
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            step="0.01"
                                            value={formData.amount}
                                            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                                            className="w-full pl-16 pr-20 py-3.5 text-lg font-semibold text-gray-700 bg-gray-50 
                                                border-2 rounded-xl transition-all duration-200
                                                focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 
                                                hover:border-gray-300
                                                placeholder:text-gray-400 placeholder:font-normal"
                                            placeholder="0"
                                        />

                                        {/* Decimal Indicator */}
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <span className="text-sm text-gray-400">.00</span>
                                        </div>

                                        {/* Amount Preview */}
                                        {formData.amount > 0 && (
                                            <div className="absolute -top-2 right-3 px-2 py-0.5 bg-sky-100 rounded-full">
                                                <span className="text-xs font-medium text-sky-700">
                                                    {new Intl.NumberFormat('id-ID', {
                                                        style: 'currency',
                                                        currency: 'IDR',
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0
                                                    }).format(formData.amount)}
                                                </span>
                                            </div>
                                        )}

                                        {/* Focus Ring Animation */}
                                        <div className="absolute inset-0 rounded-xl transition-opacity duration-200 
                                            bg-gradient-to-r from-sky-500/10 to-blue-500/10 opacity-0 
                                            group-hover:opacity-100 pointer-events-none"
                                        />
                                    </div>

                                    {/* Quick Amount Buttons */}
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {[10000, 20000, 50000, 100000].map(amount => (
                                            <button
                                                key={amount}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, amount: amount }))}
                                                className="px-3 py-1.5 text-sm font-medium rounded-lg
                                                    bg-gray-100 text-gray-600 hover:bg-gray-200 
                                                    transition-colors duration-200"
                                            >
                                                {new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                }).format(amount)}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Helper Text */}
                                    <div className="mt-2 flex items-start gap-1.5">
                                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="text-xs text-gray-500">
                                            Enter the expense amount or choose from quick amounts below
                                        </span>
                                    </div>

                                    {/* Error Message */}
                                    {formData.amount < 0 && (
                                        <div className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                />
                                            </svg>
                                            Amount cannot be negative
                                        </div>
                                    )}
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium mb-1.5 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                        Date
                                    </label>

                                    <div className="relative group">
                                        {/* Calendar Icon */}
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-sky-500 transition-colors">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>

                                        <DatePicker
                                            selected={formData.date}
                                            onChange={(date) => setFormData(prev => ({ ...prev, date }))}
                                            dateFormat="dd MMMM yyyy"
                                            className="w-full pl-11 pr-4 py-3 text-sm text-gray-700 bg-gray-50 
        border-2 rounded-xl transition-all duration-200
        focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 
        hover:border-gray-300 cursor-pointer"
                                            showPopperArrow={false}
                                            calendarClassName="date-picker-custom"
                                            renderCustomHeader={({
                                                date,
                                                decreaseMonth,
                                                increaseMonth,
                                                prevMonthButtonDisabled,
                                                nextMonthButtonDisabled
                                            }) => (
                                                <div className="flex items-center justify-between px-2 py-2">
                                                    <button
                                                        onClick={decreaseMonth}
                                                        disabled={prevMonthButtonDisabled}
                                                        type="button"
                                                        className="p-1 rounded-lg hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                        </svg>
                                                    </button>

                                                    <h3 className="text-sm font-semibold text-gray-800">
                                                        {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                                    </h3>

                                                    <button
                                                        onClick={increaseMonth}
                                                        disabled={nextMonthButtonDisabled}
                                                        type="button"
                                                        className="p-1 rounded-lg hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                        />

                                        {/* Quick Date Selector */}
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, date: new Date() }))}
                                                className="text-xs font-medium text-gray-500 hover:text-sky-500 transition-colors"
                                            >
                                                Today
                                            </button>
                                        </div>
                                    </div>

                                    {/* Helper Text */}
                                    <div className="mt-2 flex items-start gap-1.5">
                                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="text-xs text-gray-500">
                                            Select the date of the expense or click 'Today' for current date
                                        </span>
                                    </div>
                                </div>

                                {/* <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Receipt
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*,.pdf"
                                        onChange={handleFileChange}
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                                    />
                                </div> */}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        className="w-full rounded-md border border-gray-300 p-2 focus:ring-sky-500 focus:border-sky-500"
                                        rows="3"
                                        placeholder="Enter description"
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Footer - Static */}
                        <div className="flex-none px-6 py-4 bg-gray-50 rounded-b-2xl border-t">
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    onClick={handleSubmit}
                                    className={`px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-xl hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Adding...
                                        </div>
                                    ) : 'Add Expense'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddExpenseModal;
