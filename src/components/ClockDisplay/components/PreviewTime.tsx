import { FC } from 'react';

interface IPreviewTime {
  previewTime: string;
  previewTimezoneLabel: string;
  timezoneAdjustedPreviewTime: string;
}

const PreviewTime: FC<IPreviewTime> = ({ previewTime, previewTimezoneLabel, timezoneAdjustedPreviewTime }) => {
  return <div>
    <div className="small-text">When it is {previewTime} in {previewTimezoneLabel}, it will be {timezoneAdjustedPreviewTime} here.
    </div>
  </div>
}

export default PreviewTime;