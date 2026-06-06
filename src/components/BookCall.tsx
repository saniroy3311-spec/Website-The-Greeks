"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, MessageSquare, ArrowRight, Clock } from "lucide-react";

interface BookingFormValues {
  name: string;
  email: string;
  service: string;
  requirement: string;
  contactMethod: string;
  contactDetail: string;
}

export default function BookCall() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<BookingFormValues>({
    defaultValues: {
      service: "Custom Indicator",
      contactMethod: "Email",
    },
  });

  const selectedContactMethod = watch("contactMethod");

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API request submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Form Submitted:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
  };

  const steps = [
    { num: "01", title: "Fill the form", desc: "Tell me your trading strategy or tool requirements in your own words." },
    { num: "02", title: "I review it", desc: "I assess feasibility, logic complexity, and estimated timeline within 24 hours." },
    { num: "03", title: "We hop on a call", desc: "A brief 20-minute Google Meet/Zoom call to lock down exact specifications." },
    { num: "04", title: "I build & test", desc: "I write clean, optimized code and run backtests to ensure it functions perfectly." },
    { num: "05", title: "Deployment & Support", desc: "I deliver code with setup documentation, and provide post-delivery revisions." },
  ];

  return (
    <section id="book-a-call" className="py-24 bg-brand-cream/60 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Process Explainer */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-gold font-semibold">
                Engagement Process
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-brand-charcoal font-bold tracking-tight mt-2 mb-4">
                Let's build something precise.
              </h2>
              <p className="font-sans text-base text-brand-muted leading-relaxed">
                Describe your trading thesis, requirements, or bot logic. I'll review it and help you turn it into a high-performance system.
              </p>
            </div>

            {/* Visual Process steps */}
            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-4 items-start">
                  <span className="font-serif text-lg font-bold text-brand-gold bg-brand-gold/5 border border-brand-gold/25 px-2.5 py-0.5 rounded">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-brand-charcoal">{step.title}</h4>
                    <p className="font-sans text-xs text-brand-muted mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-brand-cream border border-brand-border rounded-xl p-8 md:p-10 shadow-lg relative overflow-hidden">
              
              {isSuccess ? (
                /* Success State */
                <div className="py-12 flex flex-col items-center text-center animate-fade-in">
                  <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brand-charcoal mb-2">
                    Requirement Received
                  </h3>
                  <p className="font-sans text-sm text-brand-muted max-w-sm mb-8">
                    Thank you. I will personally review your strategy specs and reply with availability within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 border border-brand-border text-brand-charcoal hover:bg-brand-parchment rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Send Another Requirement
                  </button>
                </div>
              ) : (
                /* Form State */
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="flex justify-between items-center border-b border-brand-border pb-4 mb-2">
                    <h3 className="font-serif text-xl font-bold text-brand-charcoal flex items-center gap-2">
                      <MessageSquare size={18} className="text-brand-gold" />
                      Submit Specifications
                    </h3>
                    <span className="font-mono text-[9px] text-brand-muted bg-brand-parchment px-2 py-1 rounded flex items-center gap-1">
                      <Clock size={10} /> Response &lt; 24h
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/80">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className={`w-full px-4 py-3 bg-brand-parchment/20 border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold transition-colors text-sm ${
                          errors.name ? "border-red-400" : "border-brand-border"
                        }`}
                        placeholder="Sani Roy"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-[10px] font-mono">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/80">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className={`w-full px-4 py-3 bg-brand-parchment/20 border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold transition-colors text-sm ${
                          errors.email ? "border-red-400" : "border-brand-border"
                        }`}
                        placeholder="sani@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[10px] font-mono">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Service Dropdown */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/80">
                        Project Type
                      </label>
                      <select
                        {...register("service")}
                        className="w-full px-4 py-3 bg-brand-cream border border-brand-border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold text-sm cursor-pointer"
                      >
                        <option value="Custom Indicator">Custom Indicator (Pine Script)</option>
                        <option value="Trading Bot">Trading Bot (Python / VPS)</option>
                        <option value="Investor Tool">Investor Tool (Web / Excel)</option>
                        <option value="Strategy Audit">Strategy Audit & Backtest</option>
                        <option value="Other">Other Bespoke Work</option>
                      </select>
                    </div>

                    {/* Preferred Contact Method */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/80">
                        Preferred Contact
                      </label>
                      <select
                        {...register("contactMethod")}
                        className="w-full px-4 py-3 bg-brand-cream border border-brand-border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold text-sm cursor-pointer"
                      >
                        <option value="Email">Email</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Telegram">Telegram</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact detail (e.g. number or handle) based on method */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/80">
                      {selectedContactMethod === "Email"
                        ? "Confirm Email (or alternative)"
                        : `${selectedContactMethod} Phone Number / Username *`}
                    </label>
                    <input
                      type="text"
                      {...register("contactDetail", { required: "Contact details are required" })}
                      className={`w-full px-4 py-3 bg-brand-parchment/20 border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold text-sm ${
                        errors.contactDetail ? "border-red-400" : "border-brand-border"
                      }`}
                      placeholder={
                        selectedContactMethod === "Email"
                          ? "sani@example.com"
                          : selectedContactMethod === "WhatsApp"
                          ? "+91 98765 43210"
                          : "@sani_roy_handle"
                      }
                    />
                    {errors.contactDetail && (
                      <p className="text-red-500 text-[10px] font-mono">
                        {errors.contactDetail.message}
                      </p>
                    )}
                  </div>

                  {/* Requirement Description */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal/80">
                      Describe your requirements *
                    </label>
                    <textarea
                      {...register("requirement", {
                        required: "Please write at least a short description",
                        minLength: {
                          value: 20,
                          message: "Please write in a bit more detail (min 20 characters)",
                        },
                      })}
                      rows={5}
                      className={`w-full px-4 py-3 bg-brand-parchment/20 border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold text-sm leading-relaxed ${
                        errors.requirement ? "border-red-400" : "border-brand-border"
                      }`}
                      placeholder="E.g., I want a TradingView indicator that checks when the 14-period ADX is above 25 and price is trading above the 200-period EMA. I want buy entry alert signals and a 5-stage trailing stop..."
                    />
                    {errors.requirement && (
                      <p className="text-red-500 text-[10px] font-mono">{errors.requirement.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-brand-gold disabled:bg-brand-gold/60 text-brand-cream rounded-full hover:bg-brand-gold/90 transition-all duration-300 font-sans text-xs uppercase tracking-widest font-semibold cursor-pointer shadow"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending Specs...
                      </span>
                    ) : (
                      <>
                        Send My Requirement
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
