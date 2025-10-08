/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";

interface InvoicePreviewProps {
  invoice: any & {
    user: Partial<any>; // Assuming user details are nested
    service_request: {
      service: {
        title: string;
      };
    };
  };
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const InvoicePreview = ({ invoice }: InvoicePreviewProps) => {
  // Basic tax calculation (you can make this more robust)
  const subtotal = Number(invoice.amount);
  const taxRate = 0.1; // 10%
  const tax = subtotal * taxRate;
  const totalDue = subtotal + tax;

  return (
    <Card className="max-w-4xl mx-auto shadow-lg border-none">
      <CardContent className="p-10">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
            <div className="text-sm text-gray-500 mt-4">
              <p className="font-semibold">Billed to</p>
              <p>{invoice.user.name}</p>
              {/* You would fetch the user's address from their profile */}
              <p>123 Highway Crescent</p>
              <p>LA, USA</p>
            </div>
          </div>
          <div className="text-right">
            <div className="h-12 w-24 bg-purple-600 flex items-center justify-center rounded-lg">
              <p className="text-white text-2xl font-bold">DM</p>
            </div>
            <div className="text-sm text-purple-600 font-semibold mt-2">
              Digital Marketing Agency NG
            </div>
            <div className="text-xs text-gray-500">
              <p>Business address</p>
              <p>Abuja, FCT, Nigeria</p>
            </div>
          </div>
        </header>

        <div className="flex justify-between mb-8 text-sm">
          <div>
            <p className="font-semibold text-gray-500">Invoice #</p>
            <p className="font-bold text-gray-800">{`INV-${invoice.id
              .substring(0, 8)
              .toUpperCase()}`}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-500">Invoice date</p>
            <p className="font-bold text-gray-800">
              {formatDate(invoice.created_at)}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-500">Reference</p>
            <p className="font-bold text-gray-800">{`SR-${invoice.service_request_id.substring(
              0,
              6
            )}`}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-500">Due date</p>
            <p className="font-bold text-gray-800">
              {formatDate(invoice.due_date)}
            </p>
          </div>
        </div>

        <table className="w-full text-left mb-8">
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
                Line total
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
                ₦{subtotal.toLocaleString()}
              </td>
              <td className="py-4 text-gray-800 font-semibold text-right">
                ₦{subtotal.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mb-8">
          <div className="w-full max-w-xs text-sm">
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-800">
                ₦{subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Tax (10%)</span>
              <span className="text-gray-800">₦{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-3 bg-purple-100 px-4 rounded-lg font-bold text-purple-700">
              <span>Total due</span>
              <span>₦{totalDue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Please pay within 15 days of receiving this invoice.
        </p>

        <footer className="text-center mt-10 pt-4 border-t text-xs text-gray-500 flex justify-between">
          <span>www.digitalmarketingagency.ng</span>
          <span>+234 909 000 8888</span>
          <span>support@digitalmarketingagency.ng</span>
        </footer>
      </CardContent>
    </Card>
  );
};
