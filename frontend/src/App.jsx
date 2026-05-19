import ActionCard from "./components/ActionCard";
import AuthShell from "./components/AuthShell";

function App() {
  return (
    <AuthShell
      title="Recovery hub"
      subtitle="Pick a flow below to request an OTP or reset your password."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <ActionCard
          title="Forgot password"
          description="Request a new OTP in seconds with a single email."
          to="/forgot-password"
        />
        <ActionCard
          title="Reset password"
          description="Use the OTP from your email to set a new password."
          to="/reset-password"
        />
      </div>
    </AuthShell>
  );
}

export default App;
