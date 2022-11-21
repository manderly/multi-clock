import { FC } from 'react';

interface IPreviewTime {
  previewTime: string;
  previewMeridiem: string;
  previewTimezoneLabel: string;
  timezoneAdjustedPreviewTime: string;
  timezoneAdjustedPreviewTimeMeridiem: string;
}

const PreviewTime: FC<IPreviewTime> = ({ previewTime, previewMeridiem, previewTimezoneLabel, timezoneAdjustedPreviewTime, timezoneAdjustedPreviewTimeMeridiem }) => {
  return <div className="small-text clickable">When it is {previewTime}{previewMeridiem} in {previewTimezoneLabel}, it will be {timezoneAdjustedPreviewTime}{timezoneAdjustedPreviewTimeMeridiem} here.
    </div>
}

export default PreviewTime;