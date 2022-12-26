import { FC } from 'react';

interface IPreviewTime {
  previewTime: string;
  previewMeridiem: string;
  previewTimezoneLabel: string;
  timezoneAdjustedPreviewTime: string;
  timezoneAdjustedPreviewTimeMeridiem: string;
}

const PreviewTime: FC<IPreviewTime> = ({ previewTime, previewMeridiem, previewTimezoneLabel, timezoneAdjustedPreviewTime, timezoneAdjustedPreviewTimeMeridiem }) => {

  return <div className="small-text clickable">
    <b>{previewTime}{previewMeridiem}</b> in {previewTimezoneLabel} is <b>{timezoneAdjustedPreviewTime}{timezoneAdjustedPreviewTimeMeridiem}</b> here.
    </div>
}

export default PreviewTime;