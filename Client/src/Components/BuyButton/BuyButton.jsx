import { Wallet } from "@mercadopago/sdk-react";

const BuyButton = ({ preferenceId }) => {
  return (
    <div>
      <Wallet initialization={{ preferenceId }} />
    </div>
  );
};

export default BuyButton;
