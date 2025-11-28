export const useUpload = () => {
  const supabase = useSupabaseClient()
  
  const uploadFile = async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from('invitations')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      })
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from('invitations')
      .getPublicUrl(data.path)
    
    return publicUrl
  }
  
  const uploadImage = async (file: File, invitationId: string, type: string) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${invitationId}/${type}-${Date.now()}.${fileExt}`
    
    return uploadFile(file, fileName)
  }
  
  const uploadGalleryImage = async (file: File, invitationId: string, index: number) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${invitationId}/gallery/${index}-${Date.now()}.${fileExt}`
    
    return uploadFile(file, fileName)
  }
  
  return {
    uploadFile,
    uploadImage,
    uploadGalleryImage
  }
}