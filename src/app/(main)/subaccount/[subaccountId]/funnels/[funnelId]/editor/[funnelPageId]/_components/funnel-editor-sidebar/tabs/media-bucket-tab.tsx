"use client";
import MediaComponent from "@/components/media";
import { getMedia } from "@/lib/queries";
import { GetMediaFiles } from "@/lib/types";
import React, { useEffect, useState } from "react";

type Props = {
  subaccountId: string;
};

/** 资源库 */
const MediaBucketTab = (props: Props) => {
  const [data, setdata] = useState<GetMediaFiles>(null);

  // 不同子账号，不同资源库
  useEffect(() => {
    const fetchData = async () => {
      const response = await getMedia(props.subaccountId);
      setdata(response);
    };
    fetchData();
  }, [props.subaccountId]);

  return (
    <div className="h-[900px] overflow-scroll p-4">
      <MediaComponent data={data} subaccountId={props.subaccountId} />
    </div>
  );
};

export default MediaBucketTab;
