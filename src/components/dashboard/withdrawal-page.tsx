"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

import { CreditCard, Smartphone } from "lucide-react";

const bankOptions = ["GCB Bank", "Ecobank", "Fidelity Bank", "Zenith Bank"];
const mobileNetworks = [
  "MTN Mobile Money",
  "Vodafone Cash",
  "AirtelTigo Money",
];

export default function WithdrawalPageComponent() {
  const [withdrawalMethod, setWithdrawalMethod] = useState<
    "bank" | "mobile" | null
  >(null);
  const [provider, setProvider] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const handleMethodChange = (value: "bank" | "mobile") => {
    setWithdrawalMethod(value);
    setProvider("");
    setAccountNumber("");
    setIsValidated(false);
  };

  const validateDetails = async () => {
    setIsValidating(true);
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsValidating(false);
    setIsValidated(true);
    toast.success("Details Validated");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidated) {
      toast.error("Validation Required");
      return;
    }
    if (Number(amount) < 30000) {
      toast.error("Invalid Amount");
      return;
    }
    // Here you would typically process the withdrawal
    toast.success(`Withdrawal request successful`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Withdraw Funds</CardTitle>
          <CardDescription>
            Choose your withdrawal method and enter the details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Select Withdrawal Method</Label>
              <RadioGroup
                onValueChange={handleMethodChange}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Bank Transfer
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mobile" id="mobile" />
                  <Label htmlFor="mobile" className="flex items-center">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Mobile Money
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {withdrawalMethod && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="provider">
                    Select{" "}
                    {withdrawalMethod === "bank" ? "Bank" : "Network Provider"}
                  </Label>
                  <Select onValueChange={setProvider}>
                    <SelectTrigger id="provider">
                      <SelectValue
                        placeholder={`Select ${
                          withdrawalMethod === "bank" ? "bank" : "network"
                        }`}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {(withdrawalMethod === "bank"
                        ? bankOptions
                        : mobileNetworks
                      ).map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">
                    {withdrawalMethod === "bank"
                      ? "Account Number"
                      : "Phone Number"}
                  </Label>
                  <Input
                    id="accountNumber"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder={
                      withdrawalMethod === "bank"
                        ? "Enter account number"
                        : "Enter phone number"
                    }
                    required
                  />
                </div>

                {provider && accountNumber && !isValidated && (
                  <Button
                    type="button"
                    onClick={validateDetails}
                    disabled={isValidating}
                  >
                    {isValidating ? "Validating..." : "Validate Details"}
                  </Button>
                )}

                {isValidated && (
                  <div className="space-y-2">
                    <Label htmlFor="amount">
                      Amount to Withdraw (Minimum 300)
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value) * 100)}
                      placeholder="Enter amount"
                      min="300"
                      required
                    />
                  </div>
                )}
              </>
            )}

            {isValidated && (
              <Button type="submit" className="w-full">
                Withdraw Funds
              </Button>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500 text-center w-full">
            Withdrawals are typically processed within 1-3 business days.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
