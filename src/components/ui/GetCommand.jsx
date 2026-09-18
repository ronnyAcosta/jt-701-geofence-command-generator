import { IonIcon } from "@ionic/react";
import { copyOutline } from "ionicons/icons";

import { coordinatesFormatConverter } from "../../helpers/formatters";
import { useCopyNotification } from "../../context/CopyContext";

const GetCommand = ({ geofence, index }) => {
  const { notifyCopied } = useCopyNotification();

  const handleCopy = (e) => {
    const content = e.target.parentNode.innerText;

    if (!navigator.clipboard) {
      console.log("Clipboard API is not available");
      return;
    }

    navigator.clipboard
      .writeText(content)
      .then(() => notifyCopied())
      .catch(() => console.log("Error copying content"));
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
