json.(@message, :content, :image)
json.user_name @message.user.name
json.date @message.created_at.to_s
json.id @message.id