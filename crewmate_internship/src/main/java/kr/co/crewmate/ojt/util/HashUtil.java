package kr.co.crewmate.ojt.util;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.DESedeKeySpec;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import kr.co.crewmate.ojt.web.exception.BadRequestException;


/**
 * <pre>
 *  Package : kr.co.crewmate.core.util
 *  Name : CodeUtil.java
 * </pre>
 *
 * @Author : akam8801
 * @Date : 2019. 12. 11.
 * @Desc : 암복호화 유틸
 *
 */
public class HashUtil {

    private final static Logger log = LoggerFactory.getLogger(HashUtil.class);

    private static final String ALGORITHM_AES_CFB8_NOPADDING = "AES/CFB8/NoPadding";

    private static final String ALGORITHM_DESEDE = "DESede";

    public static final String ALGORITHM_TRIPLE_DES = "TripleDES";

    public static final String ALGORITHM_ASE_CBC_PKCSSPADDING = "AES/CBC/PKCS5Padding";

    public static final String ALGORITHM_ASE_GCM_NOPADDING = "AES/GCM/NoPadding";

    public static final String ALGORITHM_PBKDF2WITHHMACSHA1 = "PBKDF2WithHmacSHA1";

    public static final int GCM_TAG_LENGTH = 16;

    private HashUtil() {
        throw new IllegalStateException("Utility class");
    }


    /**
     * AES - php의 $sCipher = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $sKey, $sStr,
     * MCRYPT_MODE_CFB, $sIV); return bin2hex($sCipher);
     *
     * @since 2019. 12. 26.
     * @author kjh8877
     * @deprecated
     *
     * @param keyString
     * @param initialVectorParam
     * @param value
     * @return
     */
    @Deprecated
    public static String aesEncryptForPhp(String keyString, String initialVectorParam, String value) {
        SecretKeySpec key = new SecretKeySpec(keyString.getBytes(), "AES");
        IvParameterSpec initalVector = new IvParameterSpec(initialVectorParam.getBytes());

        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM_AES_CFB8_NOPADDING); // AES/CFB/NoPadding
                                                                              // or
                                                                              // AES/CFB8/NoPadding
            cipher.init(Cipher.ENCRYPT_MODE, key, initalVector);
            byte[] byteData = cipher.doFinal(value.getBytes());
            return bytes2Hex(byteData);
        } catch (IllegalBlockSizeException | BadPaddingException | NoSuchAlgorithmException | NoSuchPaddingException | InvalidKeyException
                | InvalidAlgorithmParameterException e) {
            log.error(e.getMessage(), e);
            return null;
        }
    }

    /**
     *
     * AES - php의 mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $sKey, pack('H*', $sStr),
     * MCRYPT_MODE_CFB, $sIV); 에 대응되는 암호화 처리
     *
     * @since 2019. 12. 26.
     * @author kjh8877
     * @deprecated
     *
     * @param keyString
     * @param initialVectorParam
     * @param value
     * @return
     */
    @Deprecated
    public static String aesDecryptForPhp(String keyString, String initialVectorParam, String value) {
        try {
            SecretKeySpec key = new SecretKeySpec(keyString.getBytes(), "AES");
            IvParameterSpec initalVector = new IvParameterSpec(initialVectorParam.getBytes());
            Cipher cipher = Cipher.getInstance(ALGORITHM_AES_CFB8_NOPADDING); // AES/CFB/NoPadding
                                                                              // AES/CFB8/NoPadding
            cipher.init(Cipher.DECRYPT_MODE, key, initalVector);
            byte[] byteData = cipher.doFinal(hex2byte(value));

            return new String(byteData);
        } catch (InvalidKeyException | NoSuchAlgorithmException | NoSuchPaddingException | InvalidAlgorithmParameterException | IllegalBlockSizeException
                | BadPaddingException e) {
            log.error(e.getMessage(), e);
            return null;
        }
    }

    /**
     *
     * AES128
     *
     * @since 2019. 12. 26.
     * @author kjh8877
     * @deprecated
     *
     * @param keyString
     * @param initialVectorParam
     * @param value
     * @return
     * @throws NoSuchAlgorithmException
     * @throws NoSuchPaddingException
     * @throws InvalidKeyException
     * @throws InvalidAlgorithmParameterException
     * @throws IllegalBlockSizeException
     * @throws BadPaddingException
     */
    @Deprecated
    public static String aesEncrypt(String keyString, String initialVectorParam, String value) throws NoSuchAlgorithmException, NoSuchPaddingException,
            InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
        SecretKeySpec key = new SecretKeySpec(keyString.getBytes(), "AES");
        IvParameterSpec initalVector = new IvParameterSpec(initialVectorParam.getBytes());
        Cipher cipher = Cipher.getInstance(ALGORITHM_AES_CFB8_NOPADDING); // AES/CFB/NoPadding
                                                                  // |
                                                                  // AES/CFB8/NoPadding
        cipher.init(Cipher.ENCRYPT_MODE, key, initalVector);
        byte[] byteData = cipher.doFinal(value.getBytes(StandardCharsets.UTF_8));
        return new String(Base64.encodeBase64(byteData), StandardCharsets.UTF_8);
    }

    /**
     *
     * AES128
     *
     * @since 2019. 12. 26.
     * @author kjh8877
     * @deprecated
     *
     * @param keyString
     * @param initialVectorParam
     * @param value
     * @return
     * @throws NoSuchAlgorithmException
     * @throws NoSuchPaddingException
     * @throws InvalidKeyException
     * @throws InvalidAlgorithmParameterException
     * @throws IllegalBlockSizeException
     * @throws BadPaddingException
     */
    @Deprecated
    public static String aesDecrypt(String keyString, String initialVectorParam, String value) throws NoSuchAlgorithmException, NoSuchPaddingException,
            InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
        SecretKeySpec key = new SecretKeySpec(keyString.getBytes(), "AES");
        IvParameterSpec initalVector = new IvParameterSpec(initialVectorParam.getBytes());
        Cipher cipher = Cipher.getInstance(ALGORITHM_AES_CFB8_NOPADDING); // AES/CFB/NoPadding|AES/CFB8/NoPadding
        cipher.init(Cipher.DECRYPT_MODE, key, initalVector);
        byte[] byteData = cipher.doFinal(Base64.decodeBase64(value));

        return new String(byteData, StandardCharsets.UTF_8);
    }

    private static byte[] hex2byte(String s) {
        if (s == null) {
            return new byte[0];
        }
        int l = s.length();
        if (l % 2 == 1) {
            return new byte[0];
        }
        byte[] b = new byte[l / 2];
        for (int i = 0; i < l / 2; i++) {
            b[i] = (byte) Integer.parseInt(s.substring(i * 2, i * 2 + 2), 16);
        }
        return b;
    }

    private static String byte2Hex(byte b) {
        String[] hexDigits = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" };
        int nb = b & 0xFF;
        int i1 = (nb >> 4) & 0xF;
        int i2 = nb & 0xF;
        return hexDigits[i1] + hexDigits[i2];
    }

    private static String bytes2Hex(byte[] b) {
        StringBuilder sb = new StringBuilder(b.length * 2);
        for (int x = 0; x < b.length; x++) {
            sb.append(byte2Hex(b[x]));
        }
        return sb.toString();
    }

    /**
     * MD5 처리
     * @param str
     * @return
     */
    public static String md5(String str) {
        String md5 = "";

        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(str.getBytes());
            byte[] byteData = md.digest();
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < byteData.length; i++) {
                sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
            }
            md5 = sb.toString();

        } catch (NoSuchAlgorithmException e) {
            log.error(e.getMessage(), e);
            md5 = null;
        }

        return md5;
    }

    /**
     *
     * SHA-256 처리
     *
     * @since 2019. 12. 26.
     * @author kjh8877
     * @deprecated
     *
     * @param str
     * @param salt
     * @return
     */
    @Deprecated
    public static String sha256(String str, String salt) {
        String sha = "";
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.reset();
            md.update(salt.getBytes(StandardCharsets.UTF_8));

            byte[] byteData = md.digest(str.getBytes(StandardCharsets.UTF_8));
            sha = new String(Base64.encodeBase64(byteData), StandardCharsets.UTF_8);
        } catch (NoSuchAlgorithmException e) {
            log.error(e.getMessage(), e);
        } finally {
            if (StringUtils.isEmpty(sha)) {
                sha = null;
            }
        }
        return sha;
    }

    /**
     *
     * SHA-256 처리
     *
     * @since 2019. 12. 26.
     * @author kjh8877
     * @deprecated
     *
     * @param str
     * @return
     */
    @Deprecated
    public static String sha256(String str) {
        String sha = "";
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] byteData = md.digest(str.getBytes(StandardCharsets.UTF_8));
            sha = new String(Base64.encodeBase64(byteData), StandardCharsets.UTF_8);
        } catch (NoSuchAlgorithmException e) {
            log.error(e.getMessage(), e);
        } finally {
            if (StringUtils.isEmpty(sha)) {
                sha = null;
            }
        }
        return sha;
    }

    /**
     * SHA-512 처리
     * @param str
     * @return
     * @throws UnsupportedEncodingException
     */
    public static String sha512(String str) {
        return sha512(str, str);
    }

    /**
     * SHA-512 처리
     * @param str
     * @return
     * @throws UnsupportedEncodingException
     */
    public static String sha512(String str, String salt) {
        String sha = "";
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            md.update(salt.getBytes(StandardCharsets.UTF_8));
            byte[] bytes = md.digest(str.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < bytes.length; i++) {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
            }
            sha = sb.toString();

        } catch (NoSuchAlgorithmException e) {
            log.error(e.getMessage(), e);
        } finally {
            if (StringUtils.isEmpty(sha)) {
                sha = null;
            }
        }
        return sha;
    }

    /**
     * DES 복호화 처리
     * @param key
     * @param value
     * @param keySpec
     * @return
     * @throws NoSuchPaddingException
     * @throws NoSuchAlgorithmException
     * @throws InvalidKeySpecException
     * @throws InvalidKeyException
     * @throws BadPaddingException
     * @throws IllegalBlockSizeException
     * @throws Exception
     */
    public static String desDecrypt(String key, String value, String keySpec) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException,
            InvalidKeySpecException, IllegalBlockSizeException, BadPaddingException {
        String instance = (keySpec.equals(ALGORITHM_DESEDE) || keySpec.equals(ALGORITHM_TRIPLE_DES)) ? "TripleDES/ECB/PKCS5Padding" : "DES/ECB/PKCS5Padding";

        Cipher cipher = Cipher.getInstance(instance);

        cipher.init(Cipher.DECRYPT_MODE, getDESKey(key, keySpec));
        byte[] byteData = cipher.doFinal(Base64.decodeBase64(value));

        return new String(byteData, StandardCharsets.UTF_8);
    }

    /**
     * DES 암호화 처리
     * @param key
     * @param value
     * @param keySpec : TripleDES | DESede | DES
     * @return
     * @throws NoSuchPaddingException
     * @throws NoSuchAlgorithmException
     * @throws InvalidKeySpecException
     * @throws InvalidKeyException
     * @throws BadPaddingException
     * @throws IllegalBlockSizeException
     * @throws Exception
     */
    public static String desEncrypt(String key, String value, String keySpec) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException,
            InvalidKeySpecException, IllegalBlockSizeException, BadPaddingException {
        String instance = (keySpec.equals(ALGORITHM_DESEDE) || keySpec.equals(ALGORITHM_TRIPLE_DES)) ? "TripleDES/ECB/PKCS5Padding" : "DES/ECB/PKCS5Padding";

        Cipher cipher = Cipher.getInstance(instance);
        cipher.init(Cipher.ENCRYPT_MODE, getDESKey(key, keySpec));
        byte[] byteData = cipher.doFinal(value.getBytes(StandardCharsets.UTF_8));

        return new String(Base64.encodeBase64(byteData), StandardCharsets.UTF_8);
    }

    /**
     * DES 암호화에 필요한 키값을 반환함.
     * @param keyValue
     * @param keySpec : DES | TripleDES
     * @return
     * @throws InvalidKeyException
     * @throws NoSuchAlgorithmException
     * @throws InvalidKeySpecException
     * @throws Exception
     */
    private static Key getDESKey(String key, String keySpec) throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException {
        String keyValue = key;

        // TripleDES 이면서 키의 길이가 24가 아닌 경우 키의 길이를 24로 처리함.
        if ((keySpec.equals(ALGORITHM_DESEDE) || keySpec.equals(ALGORITHM_TRIPLE_DES)) && keyValue.length() != 24) {
            DESedeKeySpec desKeySpec = new DESedeKeySpec(getDESKeyValue(key, keySpec).getBytes());
            SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(keySpec);
            return keyFactory.generateSecret(desKeySpec);
        } else {
            DESKeySpec desKeySpec = new DESKeySpec(getDESKeyValue(key, keySpec).getBytes());
            SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(keySpec);
            return keyFactory.generateSecret(desKeySpec);
        }
    }

    /**
     * DES 암호화에 필요한 키의 길이를 반환함.
     * @param key
     * @param keySpec
     * @return
     */
    private static String getDESKeyValue(String key, String keySpec) {
        StringBuilder sb = new StringBuilder(key);

        if ((keySpec.equals(ALGORITHM_DESEDE) || keySpec.equals(ALGORITHM_TRIPLE_DES)) && sb.length() != 24) {
            for (int i = sb.length(); i < 24; i++) {
                sb.append(" ");
            }
        } else if (sb.length() < 8) {
            for (int i = sb.length(); i < 8; i++) {
                sb.append(" ");
            }
        }

        return sb.toString();
    }

    /**
    *
    * AES 256 암호화
    *
    * @since 2019. 12. 18.
    * @author kjh8877
    *
    * @param str
    * @return
    * @throws NoSuchAlgorithmException
    * @throws InvalidKeySpecException
    * @throws NoSuchPaddingException
    * @throws InvalidAlgorithmParameterException
    * @throws InvalidKeyException
    * @throws BadPaddingException
    * @throws IllegalBlockSizeException
    * @throws Exception
    */
    public static String aes256Encrypt(String str) {
        return aes256Encrypt(str, System.getProperty("aes256.salt.key"));
    }

    /**
     *
     * AES 256 암호화
     *
     * @since 2019. 12. 18.
     * @author kjh8877
     *
     * @param str
     * @return
     * @throws NoSuchAlgorithmException
     * @throws InvalidKeySpecException
     * @throws NoSuchPaddingException
     * @throws InvalidAlgorithmParameterException
     * @throws InvalidKeyException
     * @throws BadPaddingException
     * @throws IllegalBlockSizeException
     * @throws Exception
     */
    public static String aes256Encrypt(String str, String salt) {
        try {
            SecretKeyFactory factory = SecretKeyFactory.getInstance(ALGORITHM_PBKDF2WITHHMACSHA1);

            // 70000번 해시하여 256bit, 128bit의 키를 만든다
            PBEKeySpec keySpec = new PBEKeySpec(salt.toCharArray(), salt.getBytes(), 70000, 256);
            PBEKeySpec ivSpec = new PBEKeySpec(salt.toCharArray(), salt.getBytes(), 70000, 128);

            SecretKey secureKey = factory.generateSecret(keySpec);
            SecretKey ivKey = factory.generateSecret(ivSpec);

            SecretKeySpec secret = new SecretKeySpec(secureKey.getEncoded(), "AES");
            GCMParameterSpec iv = new GCMParameterSpec(GCM_TAG_LENGTH * Byte.SIZE, ivKey.getEncoded());

            Cipher cipher = Cipher.getInstance(ALGORITHM_ASE_GCM_NOPADDING);
            cipher.init(Cipher.ENCRYPT_MODE, secret, iv);

            byte[] encrypted = cipher.doFinal(str.getBytes(StandardCharsets.UTF_8));

            return new String(Base64.encodeBase64(encrypted));
        } catch (Exception e) {
            log.error("aes256Encrypt", e);
            throw new BadRequestException();
        }
    }

    /**
    *
    * AES 256 복호화
    *
    * @since 2019. 12. 18.
    * @author kjh8877
    *
    * @param str
    * @return
    * @throws NoSuchAlgorithmException
    * @throws InvalidKeySpecException
    * @throws NoSuchPaddingException
    * @throws InvalidAlgorithmParameterException
    * @throws InvalidKeyException
    * @throws BadPaddingException
    * @throws IllegalBlockSizeException
    * @throws Exception
    */
    public static String aes256Decrypt(String str) {
        return aes256Decrypt(str, System.getProperty("aes256.salt.key"));
    }

    /**
     *
     * AES 256 복호화
     *
     * @since 2019. 12. 18.
     * @author kjh8877
     *
     * @param str
     * @return
     * @throws NoSuchAlgorithmException
     * @throws InvalidKeySpecException
     * @throws NoSuchPaddingException
     * @throws InvalidAlgorithmParameterException
     * @throws InvalidKeyException
     * @throws BadPaddingException
     * @throws IllegalBlockSizeException
     * @throws Exception
     */
    public static String aes256Decrypt(String str, String salt) {
        try {
            SecretKeyFactory factory = SecretKeyFactory.getInstance(ALGORITHM_PBKDF2WITHHMACSHA1);

            // 70000번 해시하여 256bit, 128bit의 키를 만든다
            PBEKeySpec keySpec = new PBEKeySpec(salt.toCharArray(), salt.getBytes(), 70000, 256);
            PBEKeySpec ivSpec = new PBEKeySpec(salt.toCharArray(), salt.getBytes(), 70000, 128);

            SecretKey secureKey = factory.generateSecret(keySpec);
            SecretKey ivKey = factory.generateSecret(ivSpec);

            SecretKeySpec secret = new SecretKeySpec(secureKey.getEncoded(), "AES");
            GCMParameterSpec iv = new GCMParameterSpec(GCM_TAG_LENGTH * Byte.SIZE, ivKey.getEncoded());

            Cipher cipher = Cipher.getInstance(ALGORITHM_ASE_GCM_NOPADDING);
            cipher.init(Cipher.DECRYPT_MODE, secret, iv);

            byte[] byteStr = Base64.decodeBase64(str.getBytes());

            return new String(cipher.doFinal(byteStr), StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new BadRequestException(e);
        }
    }
}
