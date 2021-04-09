import AuthService from "../services/AuthService";

const authService = new AuthService();
const baseUrl = "https://graph.microsoft.com/v1.0";

export async function getAuthImage(url: string): Promise<string> {
  const token = (await authService.getToken()) || "";

  const headers = new Headers({ Authorization: `Bearer ${token}` });
  const options = {
    headers,
  };
  try {
    const response = await fetch(`${baseUrl}${url}`, options);
    const imageBlob = await response.blob();
    const reader = new FileReader();
    // reader.onloadend = () => reader.result as string
    // reader.readAsDataURL(imageBlob)
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(imageBlob);
    });
  } catch (err) {
    throw new Error(err.text());
  }
}

// async getProfilePic(token: string) {
//     const headers = new Headers({ Authorization: `Bearer ${token}` });
//     const options = {
//       headers,
//     };
//     try {
//       const response = await fetch(`${this.graphUrl}/me/photo/$value`, options);
//       return response.blob()
//     } catch (err) {
//       throw new Error(err.text());
//     }
//   }
