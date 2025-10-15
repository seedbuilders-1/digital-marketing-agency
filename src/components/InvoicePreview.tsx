/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logo } from "@/app/page";
import { Card, CardContent } from "@/components/ui/card";
import { selectCurrentUser } from "@/features/auth/selectors";
import { useSelector } from "react-redux";

interface InvoicePreviewProps {
  invoice: any & {
    user: Partial<any>;
    service_request: {
      service: {
        title: string;
      };
    };
  };
}

// Helper to format dates
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};

export const InvoicePreview = ({ invoice }: InvoicePreviewProps) => {
  const subtotal = Number(invoice.amount);
  const taxRate = 0.075; // Standard VAT in Nigeria is 7.5%
  const tax = subtotal * taxRate;
  const totalDue = subtotal + tax;

  const user = useSelector(selectCurrentUser);

  return (
    <Card className="shadow-lg border-none">
      <CardContent className="p-6 sm:p-10">
        {/* --- HEADER SECTION --- */}
        <header className="flex flex-col-reverse sm:flex-row justify-between items-start mb-10">
          {/* Billed To Section */}
          <div className="mt-8 sm:mt-0">
            <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
            <div className="text-sm text-gray-500 mt-4">
              <p className="font-semibold">Billed to</p>
              <p className="text-gray-900">{invoice.user.name}</p>
              <p>{user?.address}</p>
            </div>
          </div>
          {/* Agency Info Section */}
          <div className="text-left sm:text-right w-full sm:w-auto">
            <div className="h-12 w-32 relative mb-2">
              <Logo />
            </div>
            <div className="text-sm text-purple-600 font-semibold">
              Digital Marketing Agency NG
            </div>
            <div className="text-xs text-gray-500">
              <p>Business address</p>
              <p>Abuja, FCT, Nigeria</p>
            </div>
          </div>
        </header>

        {/* --- INVOICE METADATA SECTION --- */}
        <div className="flex flex-col sm:flex-row justify-between mb-8 text-sm space-y-4 sm:space-y-0">
          <div>
            <p className="font-semibold text-gray-500">Invoice #</p>
            <p className="font-bold text-gray-800">{`INV-${invoice.id
              .substring(0, 8)
              .toUpperCase()}`}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-500">Invoice Date</p>
            <p className="font-bold text-gray-800">
              {formatDate(invoice.created_at)}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-500">Due Date</p>
            <p className="font-bold text-gray-800">
              {formatDate(invoice.due_date)}
            </p>
          </div>
        </div>

        {/* --- LINE ITEMS --- */}
        <div>
          {/* --- Desktop Table View (hidden on small screens) --- */}
          <table className="w-full text-left hidden md:table">
            <thead className="border-b-2 border-gray-200">
              <tr>
                <th className="py-2 font-semibold text-gray-600">Services</th>
                <th className="py-2 font-semibold text-gray-600 text-center">
                  Qty
                </th>
                <th className="py-2 font-semibold text-gray-600 text-right">
                  Rate
                </th>
                <th className="py-2 font-semibold text-gray-600 text-right">
                  Line Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-4 font-medium text-gray-800">
                  {invoice.service_request.service.title}
                </td>
                <td className="py-4 text-gray-600 text-center">1</td>
                <td className="py-4 text-gray-600 text-right">
                  {formatCurrency(subtotal)}
                </td>
                <td className="py-4 text-gray-800 font-semibold text-right">
                  {formatCurrency(subtotal)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* --- Mobile Card View (hidden on medium screens and up) --- */}
          <div className="md:hidden space-y-4 border-t border-b py-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-800">
                  {invoice.service_request.service.title}
                </p>
                <p className="text-sm text-gray-500">
                  Qty: 1 @ {formatCurrency(subtotal)}
                </p>
              </div>
              <p className="font-semibold text-gray-800">
                {formatCurrency(subtotal)}
              </p>
            </div>
          </div>
        </div>

        {/* --- TOTALS SECTION --- */}
        <div className="flex justify-end mt-8 mb-8">
          <div className="w-full max-w-xs text-sm">
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-800">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">VAT (7.5%)</span>
              <span className="text-gray-800">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between py-3 mt-2 bg-purple-50 px-4 rounded-lg font-bold text-base text-purple-800">
              <span>Total Due</span>
              <span>{formatCurrency(totalDue)}</span>
            </div>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <footer className="text-center mt-10 pt-6 border-t flex flex-col sm:flex-row justify-between text-xs text-gray-500 space-y-2 sm:space-y-0">
          <span>www.digitalmarketingagency.ng</span>
          <span>+234 909 000 8888</span>
          <span>support@digitalmarketingagency.ng</span>
        </footer>
      </CardContent>
    </Card>
  );
};
