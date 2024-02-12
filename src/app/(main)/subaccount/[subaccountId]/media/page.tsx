import BlurPage from "@/components/global/blur-page";
import MediaComponent from "@/components/media";
import { getMedia } from "@/lib/queries";
import React from "react";

type Props = {
  params: { subaccountId: string };
};

/** 媒体资源库page */
const Media = async ({ params }: Props) => {
  const data = await getMedia(params.subaccountId);

  return (
    <BlurPage>
      <MediaComponent data={data} subaccountId={params.subaccountId} />
    </BlurPage>
  );
};

export default Media;
