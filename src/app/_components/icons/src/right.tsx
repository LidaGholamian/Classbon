import BaseIcon from "@/app/_components/icons/base-icon";
import { SvgIcons } from "@/app/_components/icons/icon.types";


export default function SvgIcon(props:SvgIcons) {
  return (
    <BaseIcon {...props}>
      <path d="M7.505 3L16.5 12.027L7.5 21"/>
    </BaseIcon>
  );
}
