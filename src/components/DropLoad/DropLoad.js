import React from 'react';
import { DropzoneDialog } from 'material-ui-dropzone';
function DropLoad(open) {
  const [openDrop, setOpenDrop] = React.useState(open);

  return (
    <div>
      <DropzoneDialog
        acceptedFiles={['.zip']}
        cancelButtonText={'cancel'}
        submitButtonText={'submit'}
        maxFileSize={5000000}
        open={openDrop}
        onClose={() => setOpenDrop(false)}
        onSave={(files) => {
          console.log('Files:', files);
          setOpenDrop(false);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}

        // // showPreviews={true}
        // // showPreviewsInDropzone={false}
        // previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
        // previewChipProps={{ classes: { root: classes.previewChip } }}
        // previewText="Selected files"
        // acceptedFiles={['.zip']}
        // useChipsForPreview
        // maxFileSize={30000000}
        // onChange={(e) => setFile(e)}
        // onAdd={(fileObjs) => console.log('Added Files:', fileObjs)}
        // onDelete={(fileObj) => console.log('Removed File:', fileObj)}
        // onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
      />
    </div>
  );
}

export default DropLoad;
