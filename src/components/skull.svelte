<script>
  import { FileDropzone } from '@skeletonlabs/skeleton';


</script>

  <FileDropzone on:change={(e)=>{console.log(e.target.files)}} class="h-[4rem]" border={'border-2 border-dashed'} name="files" />
