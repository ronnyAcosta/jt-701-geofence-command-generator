import { IonIcon } from "@ionic/react";
import { copyOutline } from "ionicons/icons";

import { coordinatesFormatConverter } from "../../helpers/formatters";
import { toast } from "sonner";
const GetCommand = ({ geofence, index }) => {

  const handleCopy = async (e) => {
  const content = e.currentTarget.parentNode.innerText;

  try {
    await navigator.clipboard.writeText(content);
    toast.info("Copied to clipboard");
  } catch (error) {
    console.error("Error copying content", error);
    toast.error("Could not copy to clipboard");
  }
};

  if (geofence.coordinates.length > 10) {
    return (
      <span className="error">
        Coordinates limit exceeded. Edit geofence. Maximum 10 points.
      </span>
    );
  }

  let command = `(P29,1,${index},1,${geofence.coordinates.length}`;
  geofence.coordinates.map((coordinate) => {
    command += `,${coordinatesFormatConverter(coordinate.lng)},${coordinatesFormatConverter(coordinate.lat)}`;
    return 0;
  });
  command += ")";
  return (
    <span className="command">
      {command}
      {geofence.coordinates.length <= 10 ? (
        <IonIcon
          className="copy"
          slot="end"
          icon={copyOutline}
          onClick={handleCopy}
        ></IonIcon>
      ) : (
        ""
      )}
    </span>
  );
};

export default GetCommand;
