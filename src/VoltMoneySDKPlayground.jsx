import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "/@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "/@/components/ui/radio-group";
import { Label } from "/@/components/ui/label";
import { Input } from "/@/components/ui/input";
import { Button } from "/@/components/ui/button";

const VoltMoneySDKPlayground = () => {
  const [primaryColor, setPrimaryColor] = useState("#6366F1");
  const [secondaryColor, setSecondaryColor] = useState("#EC4899");
  const [formData, setFormData] = useState({
    voltPlatformCode: "",
    platformAuthToken: "",
    customerSSOToken: "",
    voltCustomerCode: "",
    targetPage: "",
    divId: "",
    utmSource: "",
    utmCampaign: "",
    utmMedium: "",
    utmTerm: "",
  });
  const fieldLabels = {
    voltPlatformCode: "Volt Platform Code",
    platformAuthToken: "Platform Auth Token",
    customerSSOToken: "Customer SSO Token",
    voltCustomerCode: "Volt Customer Code",
    targetPage: "Target Page",
    divId: "Div ID",
    utmSource: "UTM Source",
    utmCampaign: "UTM Campaign",
    utmMedium: "UTM Medium",
    utmTerm: "UTM Term",
    // Add more mappings as needed
  };

  const [launchMode, setLaunchMode] = useState("popup");
  const [environment, setEnvironment] = useState("staging");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Step 1: Import the SDK script dynamically
    const script = document.createElement("script");
    script.src = "https://staging.voltmoney.in/sdk/VoltMoney-sdk-v1.9.js"; // Replace with the actual SDK link
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const requiredFields = ["voltPlatformCode", "platformAuthToken"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setError(
        `Please fill in all required fields: ${missingFields.join(", ")}`,
      );
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      try {
        const {
          voltPlatformCode,
          platformAuthToken,
          customerSSOToken,
          voltCustomerCode,
          targetPage,
          divId,
          utmSource,
          utmCampaign,
          utmMedium,
          utmTerm,
        } = formData;

        // Set default dimensions for the iframe
        let iframeWidth = 650;
        let iframeHeight = 700;

        // If "Mobile View" is selected, adjust the dimensions
        if (launchMode === "mobileView") {
          iframeWidth = 375; // Typical mobile width
          iframeHeight = 667; // Typical mobile height (iPhone 6/7/8)
        }

        // Step 2: Create the SDK object
        const sdkObj = new window.Volt({
          environment,
          pColor: primaryColor.replace(/#/g, ""),
          sColor: secondaryColor.replace(/#/g, ""),
          target: targetPage,
          voltPlatformCode,
          tracking: { utmSource, utmCampaign, utmTerm, utmMedium },
          customerSsoToken: customerSSOToken,
          divId: launchMode === "div" ? "test_" : divId, // Ensure the correct divId is used for div mode

          launchMode: launchMode === "mobileView" ? "popup" : launchMode, // Treat "Mobile View" as "popup"
          iframeWidth,
          iframeHeight,
        });

        // Step 3: Assign the SDK object to the window
        window.volt = sdkObj;

        // Step 4: Submit the SDK
        sdkObj.submit(platformAuthToken, voltCustomerCode, customerSSOToken);

        setIsLoading(false);
      } catch (err) {
        setError(
          "An error occurred while launching the SDK. Please try again.",
        );
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 space-y-8 transform transition-all duration-500 hover:scale-[1.02]">
        <h1 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
          Volt Money SDK Playground
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Pick Primary Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-12 h-12 p-1 rounded-md cursor-pointer"
                />
                <Input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-full h-10 p-1 border rounded"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Pick Secondary Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-12 h-12 p-1 rounded-md cursor-pointer"
                />
                <Input
                  type="text"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-full h-10 p-1 border rounded"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {Object.keys(formData).map((key) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>
                  {fieldLabels[key] || key.split(/(?=[A-Z])/).join(" ")}
                  {["voltPlatformCode", "platformAuthToken"].includes(key) &&
                    " *"}
                </Label>
                <Input
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${fieldLabels[key] || key.split(/(?=[A-Z])/).join(" ")}`}
                  className="w-full h-10 p-1 border rounded"
                />
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {/* Launch Mode Section */}
            <div className="space-y-2">
              <Label className="font-semibold">Launch Mode</Label>
              <div className="radio-container">
                <input
                  type="radio"
                  name="launchMode"
                  value="popup"
                  checked={launchMode === "popup"}
                  onChange={(e) => setLaunchMode(e.target.value)}
                />
                <Label htmlFor="popup" className="ml-2">
                  Popup
                </Label>

                <input
                  type="radio"
                  name="launchMode"
                  value="newTab"
                  checked={launchMode === "newTab"}
                  onChange={(e) => setLaunchMode(e.target.value)}
                  className="ml-4"
                />
                <Label htmlFor="newTab" className="ml-2">
                  New Tab
                </Label>

                <input
                  type="radio"
                  name="launchMode"
                  value="div"
                  checked={launchMode === "div"}
                  onChange={(e) => setLaunchMode(e.target.value)}
                  className="ml-4"
                />
                <Label htmlFor="div" className="ml-2">
                  Div
                </Label>
                <input
                  type="radio"
                  name="launchMode"
                  value="mobileView"
                  checked={launchMode === "mobileView"}
                  onChange={(e) => setLaunchMode(e.target.value)}
                  className="ml-4"
                />
                <Label htmlFor="mobileView" className="ml-2">
                  Mobile View
                </Label>
              </div>
            </div>

            {/* Environment Section */}
            <div className="space-y-2">
              <Label className="font-semibold">Environment</Label>
              <div className="radio-container">
                <input
                  type="radio"
                  name="environment"
                  value="staging"
                  checked={environment === "staging"}
                  onChange={(e) => setEnvironment(e.target.value)}
                />
                <Label htmlFor="staging" className="ml-2">
                  Staging
                </Label>

                <input
                  type="radio"
                  name="environment"
                  value="production"
                  checked={environment === "production"}
                  onChange={(e) => setEnvironment(e.target.value)}
                  className="ml-4"
                />
                <Label htmlFor="production" className="ml-2">
                  Production
                </Label>
              </div>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-center">
            <Button
              type="submit"
              className={`px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Launching..." : "Launch SDK"}
            </Button>
          </div>
        </form>
        <div id="test_"></div>
      </div>
    </div>
  );
};

export default VoltMoneySDKPlayground;
