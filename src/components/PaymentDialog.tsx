import { useState } from "react";
import { X, CreditCard, CheckCircle, Loader2, IndianRupee, Smartphone, Landmark, Wallet, ArrowLeft } from "lucide-react";

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  energyType: string;
  amount: number;
  billDetails: { label: string; value: string }[];
}

const paymentMethods = [
  { id: "upi", label: "UPI / Google Pay", icon: Smartphone },
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "netbanking", label: "Net Banking", icon: Landmark },
  { id: "wallet", label: "Wallet", icon: Wallet },
];

const banks = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Punjab National Bank", "Bank of Baroda"];
const wallets = ["Paytm", "PhonePe", "Amazon Pay", "MobiKwik", "Freecharge"];

export const PaymentDialog = ({ isOpen, onClose, energyType, amount, billDetails }: PaymentDialogProps) => {
  const [step, setStep] = useState<"details" | "payment" | "form" | "processing" | "success">("details");
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  // Form fields
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");

  if (!isOpen) return null;

  const handleMethodSelect = (methodId: string) => {
    setPaymentMethod(methodId);
    setStep("form");
  };

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => setStep("success"), 2500);
  };

  const handleClose = () => {
    setStep("details");
    setPaymentMethod("");
    setUpiId("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    setCardName("");
    setSelectedBank("");
    setSelectedWallet("");
    onClose();
  };

  const isFormValid = () => {
    switch (paymentMethod) {
      case "upi": return upiId.includes("@");
      case "card": return cardNumber.length >= 16 && cardExpiry.length >= 5 && cardCvv.length >= 3 && cardName.length > 0;
      case "netbanking": return selectedBank !== "";
      case "wallet": return selectedWallet !== "";
      default: return false;
    }
  };

  const formatCardNumber = (val: string) => {
    const nums = val.replace(/\D/g, "").slice(0, 16);
    return nums.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const nums = val.replace(/\D/g, "").slice(0, 4);
    if (nums.length > 2) return nums.slice(0, 2) + "/" + nums.slice(2);
    return nums;
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 placeholder:text-muted-foreground/60 transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm fade-in">
      <div className="w-full max-w-md mx-4 rounded-2xl border border-border bg-card shadow-xl scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card rounded-t-2xl z-10">
          <div className="flex items-center gap-2">
            {(step === "form") && (
              <button onClick={() => setStep("payment")} className="p-1 rounded-lg hover:bg-muted transition-colors mr-1">
                <ArrowLeft className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
            <CreditCard className="w-5 h-5 text-primary" />
            <h3 className="font-display font-semibold text-lg">{energyType} Bill Payment</h3>
          </div>
          <button onClick={handleClose} className="p-1 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6">
          {/* Step 1: Bill Details */}
          {step === "details" && (
            <div className="space-y-4 fade-in">
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
                <p className="text-sm text-muted-foreground mb-1">Total Amount Due</p>
                <p className="text-3xl font-display font-bold text-primary flex items-center justify-center gap-1">
                  <IndianRupee className="w-6 h-6" />
                  {amount.toLocaleString()}
                </p>
              </div>
              <div className="space-y-2">
                {billDetails.map((detail, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-border/30 last:border-0">
                    <span className="text-sm text-muted-foreground">{detail.label}</span>
                    <span className="text-sm font-medium">{detail.value}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep("payment")}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Proceed to Pay
              </button>
            </div>
          )}

          {/* Step 2: Select Payment Method */}
          {step === "payment" && (
            <div className="space-y-3 fade-in">
              <p className="text-sm text-muted-foreground font-medium mb-1">Select Payment Method</p>
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handleMethodSelect(method.id)}
                  className="w-full p-4 rounded-xl border border-border bg-muted/30 text-left hover:border-primary hover:bg-primary/5 transition-all flex items-center gap-3"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <method.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-sm">{method.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Payment Form */}
          {step === "form" && (
            <div className="space-y-4 fade-in">
              {/* Amount reminder */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border/30">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="font-bold text-primary">₹{amount.toLocaleString()}</span>
              </div>

              {/* UPI Form */}
              {paymentMethod === "upi" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <p className="text-sm font-semibold">Enter UPI ID</p>
                  </div>
                  <input
                    type="text"
                    placeholder="yourname@gpay / yourname@paytm"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className={inputClass}
                  />
                  <p className="text-xs text-muted-foreground">
                    A payment request of ₹{amount.toLocaleString()} will be sent to this UPI ID from <span className="font-semibold">VaultLock Bills</span>
                  </p>
                  {upiId && !upiId.includes("@") && (
                    <p className="text-xs text-destructive">Please enter a valid UPI ID (e.g., name@gpay)</p>
                  )}
                </div>
              )}

              {/* Card Form */}
              {paymentMethod === "card" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <p className="text-sm font-semibold">Card Details</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={formatCardNumber(cardNumber)}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                    maxLength={19}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className={inputClass}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formatExpiry(cardExpiry)}
                      onChange={(e) => setCardExpiry(e.target.value.replace(/\D/g, ""))}
                      maxLength={5}
                      className={inputClass}
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      maxLength={4}
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {/* Net Banking Form */}
              {paymentMethod === "netbanking" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Landmark className="w-5 h-5 text-primary" />
                    <p className="text-sm font-semibold">Select Your Bank</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {banks.map((bank) => (
                      <button
                        key={bank}
                        onClick={() => setSelectedBank(bank)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                          selectedBank === bank
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                  {selectedBank && (
                    <p className="text-xs text-muted-foreground">
                      You will be redirected to {selectedBank}'s secure payment page
                    </p>
                  )}
                </div>
              )}

              {/* Wallet Form */}
              {paymentMethod === "wallet" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-5 h-5 text-primary" />
                    <p className="text-sm font-semibold">Select Wallet</p>
                  </div>
                  {wallets.map((wallet) => (
                    <button
                      key={wallet}
                      onClick={() => setSelectedWallet(wallet)}
                      className={`w-full p-3 rounded-xl border text-left text-sm font-medium transition-all ${
                        selectedWallet === wallet
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-muted/30 text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {wallet}
                    </button>
                  ))}
                  {selectedWallet && (
                    <p className="text-xs text-muted-foreground">
                      ₹{amount.toLocaleString()} will be debited from your {selectedWallet} wallet
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={handlePay}
                disabled={!isFormValid()}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {paymentMethod === "upi" ? `Send Request · ₹${amount.toLocaleString()}` :
                 paymentMethod === "netbanking" ? `Pay via ${selectedBank || "Bank"} · ₹${amount.toLocaleString()}` :
                 `Pay ₹${amount.toLocaleString()}`}
              </button>
            </div>
          )}

          {/* Processing */}
          {step === "processing" && (
            <div className="flex flex-col items-center py-8 fade-in">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="font-display font-semibold text-lg">
                {paymentMethod === "upi" ? "Sending payment request..." : "Processing Payment..."}
              </p>
              <p className="text-sm text-muted-foreground">
                {paymentMethod === "upi" ? `Request sent to ${upiId}` : "Please wait"}
              </p>
              {paymentMethod === "upi" && (
                <p className="text-xs text-muted-foreground mt-1">Payee: <span className="font-semibold text-foreground">VaultLock Bills</span></p>
              )}
            </div>
          )}

          {/* Success */}
          {step === "success" && (
            <div className="flex flex-col items-center py-8 fade-in">
              <div className="p-3 rounded-full bg-energy-green/20 mb-4">
                <CheckCircle className="w-12 h-12 text-energy-green" />
              </div>
              <p className="font-display font-semibold text-lg text-energy-green">Payment Successful!</p>
              <p className="text-sm text-muted-foreground mt-1">₹{amount.toLocaleString()} paid for {energyType}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {paymentMethod === "upi" && `Paid via UPI: ${upiId}`}
                {paymentMethod === "card" && `Paid via Card: ****${cardNumber.slice(-4)}`}
                {paymentMethod === "netbanking" && `Paid via ${selectedBank}`}
                {paymentMethod === "wallet" && `Paid via ${selectedWallet}`}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Transaction ID: TXN{Date.now().toString().slice(-8)}</p>
              <button
                onClick={handleClose}
                className="mt-6 px-6 py-2 rounded-xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
