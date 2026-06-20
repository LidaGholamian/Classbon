import BaseIcon from "@/app/_components/icons/base-icon";
import { SvgIcons } from "@/app/_components/icons/icon.types";


export default function SvgIcon(props:SvgIcons) {
  return (
    <BaseIcon {...props}>
      <path d="M21 16.5L11.989 7.5L3 16.5"/>
    </BaseIcon>
  );
}
