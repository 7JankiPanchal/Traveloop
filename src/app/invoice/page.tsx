import React from 'react';
import { ArrowLeft } from 'lucide-react';
import InvoiceHeader from '@/components/invoice/InvoiceHeader';
import InvoiceHero from '@/components/invoice/InvoiceHero';
import BudgetInsights from '@/components/invoice/BudgetInsights';
import ExpenseTable from '@/components/invoice/ExpenseTable';
import InvoiceActions from '@/components/invoice/InvoiceActions';

export default function InvoicePage() {
  return (
    <div className="h-screen flex flex-col font-sans bg-slate-50 text-slate-900 overflow-hidden relative">
      <InvoiceHeader />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-8 py-6 md:py-8 overflow-hidden flex flex-col gap-6">
        {/* Breadcrumb */}
        <nav className="-mt-2 shrink-0">
          <button className="group flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="mr-1.5 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="group-hover:underline underline-offset-4">Back to My Trips</span>
          </button>
        </nav>

        {/* Top Panels: Hero & Budget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch shrink-0 lg:h-48">
          <InvoiceHero />
          <BudgetInsights />
        </div>

        <ExpenseTable />
      </main>

      <InvoiceActions />
    </div>
  );
}
