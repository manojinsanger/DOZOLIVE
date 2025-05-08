import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "Privacy Policy",
          headerBackVisible: true,
          headerStyle: { backgroundColor: "#F1567D" },
          headerTintColor: "#ffffff",
        }}
      /> */}

      {/* Scrollable Content */}
      <ScrollView style={styles.content }>
        <Text style={styles.sectionTitle}>Latest updated: January, 2025</Text>
        
        <Text style={styles.paragraph}>
          This Dozo Live host agreement (hereinafter referred to as "this Agreement") stipulates the rights and obligations between the company and its affiliated enterprises (hereinafter referred to as "Dozo Live" or "Dozo Live platform") and the host (hereinafter referred to as "you") regarding the provision of video / voice live broadcasting services on Dozo Live platform. Please read this Agreement carefully before the live video / voice broadcast to ensure that you have fully understood the terms of this agreement. You are not entitled to use the services covered by this Agreement unless you accept all the terms of this agreement. Your live video / voice broadcast on Dozo Live platform will be regarded as your acceptance of this Agreement and agree to be bound by the terms of this agreement.
        </Text>

        <Text style={styles.sectionTitle}>1. General Provisions</Text>
        
        <Text style={styles.paragraph}>1.1 You must be at least 18 years old and have full capacity for civil conduct; or you must be at least 16 years old and live mainly from your own labor income. If you do not meet the above conditions, you should immediately terminate the registration or use.</Text>
        
        <Text style={styles.paragraph}>1.2 Dozo Live will provide you with the live video / voice broadcast service of the platform anchor. You can use the above services for performance sharing and online interaction after agreeing to this agreement.</Text>
        
        <Text style={styles.paragraph}>1.3 According to this Agreement and the rules of the platform, you apply to be the anchor on Dozo Live platform to provide online video / voice live service for users of Dozo Live platform and interact with them. The period when you provide services on Dozo Live platform shall be regarded as within the term of the agreement. Dozo Live conducts formal audit on the content (including but not limited to pictures, posters, avatars, audio, video, etc.) uploaded by you or edited, produced by you, but you still need to bear corresponding legal responsibilities for the authenticity, legality, accuracy, timeliness, etc. of the above content.</Text>
        
        <Text style={styles.paragraph}>1.4 In the process of registering or using this service, you need to fill in or submit some necessary information and materials for Dozo Live platform review. If the information you submit is incomplete or does not comply with the provisions of laws and regulations or Dozo Live platform, you may not be able to register successfully or be restricted in the process of using this service. If your personal information or contact information changes, you must update it to Dozo Live in time.</Text>
        
        <Text style={styles.paragraph}>1.5 Dozo Live only provides you with online live interactive network platform, you and Dozo Live do not constitute any employment or labor relationship.</Text>

        <Text style={styles.sectionTitle}>2. Service rules</Text>
        
        <Text style={styles.paragraph}>2.1 Dozo Live has the right to revise and change the protocols, rules and code of conduct of Dozo Live platform (such as Internet website and mobile network) regularly or irregularly. You understand and agree with this.</Text>
        
        <Text style={styles.paragraph}>2.2 Dozo Live has the right to entrust the management of the anchor to other third-party organizations entrusted by your studio or brokerage company (hereinafter referred to as "guild") according to your application or the rules published on the platform.</Text>
        
        <Text style={styles.paragraph}>2.3 Dozo Live and the guild have the right to assess and evaluate you according to the rules of the platform (the assessment and evaluation criteria include but are not limited to the length of live broadcast, the number of users watching, the number and types of virtual gifts given by users, user support, user complaints, violations of laws and regulations, etc.), so as to determine your virtual props and income; if you violate laws, regulations or vs Dozo Live and the guild will take punitive measures (including but not limited to deduction of virtual props and income, or even direct closure of your account).</Text>
        
        <Text style={styles.paragraph}>2.4 Dozo Live has the right to put forward suggestions and opinions on the improvement of the live broadcast service on the Dozo Live platform. You should make corresponding rectification within 3 days after receiving the suggestions or opinions from Dozo Live. Otherwise, Dozo Live has the right to take the above-mentioned punishment measures.</Text>
        
        <Text style={styles.paragraph}>2.5 Dozo Live has the right to review the legality of your live video / voice content (including but not limited to pictures, posters, avatars, audio, video, etc.) according to laws and regulations or the requirements of relevant departments. If the content of video / voice live broadcast violates the law, rules and regulations, or infringes upon the legitimate rights and interests of Dozo Live or a third party, Dozo Live has the right to take measures such as stopping the broadcast, deleting the content, closing the account, canceling the account, and cooperating with the competent department for investigation.</Text>
        
        <Text style={styles.paragraph}>2.6 Dozo Live has the right to mark the watermark with Dozo Live logo (or name) and time in your live broadcast room. You need to make corresponding adjustment according to the live broadcast effect.</Text>
        
        <Text style={styles.paragraph}>2.7 Dozo Live is responsible for providing you with a platform for live video / voice broadcasting, and providing platform technical service support. However, Dozo Live does not guarantee that the network service can meet any of your requirements, that the network service is always smooth, and that the network service is timely, secure, and accurate.</Text>
        
        <Text style={styles.paragraph}>2.8 Dozo Live will contact you or send relevant notices through platform announcement, platform message push, e-mail, SMS or conventional letter transmission. Such notice shall be deemed to have been served on the day it is sent.</Text>
        
        <Text style={styles.paragraph}>2.9 In view of the particularity of the live video / voice service, you agree that Dozo Live has the right to change, interrupt or terminate part or all of the live video / voice service at any time. In case of any loss caused by the change, interruption or termination of the live video / voice service, Dozo Live shall not be liable to you or any third party, but Dozo Live shall try its best to notify the user in the form of announcement, e-mail or system pop-up before the change, interruption or termination of the service.</Text>

        <Text style={styles.sectionTitle}>3. Rules of use</Text>
        
        <Text style={styles.paragraph}>3.1 You promise that you will not damage the legitimate interests of a third party or violate Singapore laws, regulations and normative provisions by performing this agreement. You accept and perform this Agreement without violating any legal documents binding on you, and will not make Dozo Live bear any responsibility to any third party.</Text>
        
        <Text style={styles.paragraph}>3.2 You guarantee that you have the conditions, ability and qualification to perform the responsibilities and obligations of the anchor as agreed in this agreement.</Text>
        
        <Text style={styles.paragraph}>3.3 You understand and agree that all income generated by you based on the Dozo Live platform shall be subject to the background data of Dozo Live; at the same time, you shall abide by the platform operation system such as but not limited to the live broadcasting code of conduct and the anchor management rules and requirements (hereinafter referred to as "platform rules and anchor specifications") updated from time to time on the Dozo Live platform, as well as the national laws and regulations on such Internet services Normative provisions, etc.</Text>
        
        <Text style={styles.paragraph}>3.4 You agree that Dozo Live will use your name (including but not limited to your real name, pen name, net name, former name and any character symbol representing your identity) and portrait (including but not limited to real person portrait and cartoon portrait) free of charge for all kinds of publicity and promotion of Dozo Live and its affiliated enterprises, and provide necessary cooperation.</Text>
        
        <Text style={styles.paragraph}>3.5 You guarantee that you have the ownership or legal right to use all the pictures, posters, avatars and other contents uploaded in Dozo Live, and have the right to upload them to Dozo Live and authorize Dozo Live to use them. You confirm that any improper behavior, violation of laws and regulations and relevant operation rules of Dozo Live, or infringement of the legitimate rights and interests of a third party in the process of using the video / voice live broadcasting service shall be borne by you Dozo Live has no responsibility. If the damage is caused by your behavior, Dozo Live shall be compensated, and Dozo Live has the right to directly deduct the above compensation expenses from your shared expenses.</Text>
        
        <Text style={styles.paragraph}>3.6 You shall bear the conditions and expenses (including but not limited to the telephone and Internet charges for Internet access and mobile phone charges for using mobile network) of the network, video and voice supporting equipment (including but not limited to computer, microphone, video device, mobile phone, earphone, sound card and other hardware and software) required for the live video / voice broadcast. The image and speech quality are clear and stable. If the live broadcast is blocked or unable to watch due to your network reasons, Dozo Live has the right to ask you to upgrade the network. You should make corresponding rectification within 3 days after receiving Dozo Live's suggestions or opinions, otherwise Dozo Live has the right to take corresponding punishment measures.</Text>
        
        <Text style={styles.paragraph}>3.7 The video / voice live service you provide on Dozo Live platform and all the information, information and speech you publish shall not be involved in politics, guns, drugs, violence, pornography or any other content that violates Singapore laws, regulations and normative provisions, including but not limited to endangering national security, obscenity, falsity, slander, intimidation and harassment of others, infringement of intellectual property rights of others Business secrets or other legitimate rights and interests, as well as contents that violate public order and good customs, or ways to point to the above contents.</Text>
        
        <Text style={styles.paragraph}>3.8 You must provide true, accurate, legal and effective personal identity information and contact information to complete real name authentication; if your personal information or contact information changes, you must update it to Dozo Live in time.</Text>
        
        <Text style={styles.paragraph}>3.9 You must cooperate with Dozo Live to verify the authenticity of personal data manually. Dozo Live will keep the certified data strictly confidential and keep them permanently for future reference.</Text>
        
        <Text style={styles.paragraph}>3.10 You promise to abide by the principle of good faith, do not disturb the normal order of Dozo Live platform, do not publish commercial advertisements without the consent of Dozo Live, and do not engage in activities unrelated to live online performance.</Text>
        
        <Text style={styles.paragraph}>3.11 Your registered account number and password are the only identity certificate for you to accept the platform service. You are responsible for keeping and setting the password. It is forbidden to give, borrow, rent, transfer or sell. You should take full legal responsibility for all activities and events with your account.</Text>
        
        <Text style={styles.paragraph}>3.12 You promise that the above information includes but is not limited to all kinds of accounts used in Dozo Live, third-party payment accounts, corresponding passwords and other important information, and will not be disclosed in the process of live broadcast or other use of platform services, nor will you publish, upload or provide information involving your privacy to other people through platform services, otherwise you shall bear the responsibility and losses arising therefrom.</Text>
        
        <Text style={styles.paragraph}>3.13 You promise not to do anything harmful to the image and brand of Dozo Live, otherwise Dozo Live has the right to terminate the agreement, close the account and ask you to bear all legal and compensation liabilities.</Text>
        
        <Text style={styles.paragraph}>3.14 During the term of this Agreement and after the termination of this agreement, you are not allowed to spread and publicize any speech, picture, video, etc. that is harmful to the reputation and image of Dozo Live in any way, spread any false information in any way, and damage the interests of Dozo Live in any way, such as encouraging Dozo Live users. Otherwise, Dozo Live has the right to ask you for compensation (including but not limited to deduction of virtual props and income, Even close your account directly).</Text>
        
        <Text style={styles.paragraph}>3.15 If a third party participates in your live broadcast, you should guarantee that there is no legal dispute with the third party. If there is any dispute, you are solely responsible for it and have nothing to do with Dozo Live. If Dozo Live suffers losses, you should compensate Dozo Live for such losses.</Text>
        
        <Text style={styles.paragraph}>3.16 You promise to actively maintain the image of Dozo Live and Dozo Live platform, and you shall not do anything harmful to the image or interests of Dozo Live or Dozo Live platform. During the term of this Agreement and after the termination of this agreement, you are not allowed to express any opinion suggestive of or unfavorable to Dozo Live or Dozo Live platform in any form through any channel.</Text>
        
        <Text style={styles.paragraph}>3.17 You are not allowed to mention or display the name, logo, registration number and picture of other live broadcasting platforms in any form (including but not limited to personal news, personal information page, live room name, poster, text, voice, video, picture, background, setting, etc.) on any occasion. You are not allowed to guide existing users of Dozo Live platform, other anchors or Dozo Live employees to enter Otherwise, Dozo Live has the right to punish your breach of contract.</Text>
        
        <Text style={styles.paragraph}>3.18 Dozo Live only provides platform services. If you establish a contractual relationship with a studio, brokerage company or other third party organization, all disputes arising from this have nothing to do with Dozo Live, and Dozo Live will not assume any responsibility.</Text>
        
        <Text style={styles.paragraph}>3.19 If you are appointed to Dozo Live by the studio, brokerage company or other third-party organization that has signed the relevant brokerage or labor relationship with you for live interaction, all the virtual props and income you get in Dozo Live will be paid by Dozo Live to the above-mentioned organization and settled with you by the above-mentioned organization. You agree not to claim against Dozo Live at any time or in any way for the above-mentioned virtual props or income Any claim.</Text>

        <Text style={styles.sectionTitle}>4. Intellectual property rights</Text>
        
        <Text style={styles.paragraph}>4.1 Dozo Live video / voice service includes Dozo Live website, mobile application software, text, picture, video, audio and other elements. Dozo Live owns all intellectual property rights of its service logo, logo and any of the above elements.</Text>
        
        <Text style={styles.paragraph}>4.2 You are not allowed to reverse engineer, reverse assemble or reverse compile the relevant web pages, applications, software and other products involved in the platform services.</Text>
        
        <Text style={styles.paragraph}>4.3 You license Dozo Live free, permanent, irrevocable, exclusive and sublicense rights all over the world, including but not limited to: reproduction rights, distribution rights, etc The right to exercise, lease, exhibition, performance, projection, broadcasting, information network transmission, film production, adaptation, translation, compilation and other copyright property rights and neighboring rights as stipulated in the copyright law.</Text>

        <Text style={styles.sectionTitle}>5. Confidentiality obligation</Text>
        
        <Text style={styles.paragraph}>5.1 Economic, direct or indirect losses shall be compensated by you. Trade secret refers to all practical and non-public information provided by Dozo Live, or learned by you during the use of platform services, or Dozo Live undertakes confidentiality obligations to a third party, which is related to Dozo Live business and can bring economic benefits to Dozo Live, including but not limited to technical information, business information and information and documents related to Dozo Live Administration (including this Agreement) The amount and settlement method, standard, ownership method, authorization method, customer list, other anchor list, contact information, service fee, Dozo Live staff list and other information that are not known to the public.</Text>
        
        <Text style={styles.paragraph}>5.2 You shall strictly abide by this agreement. Without the written authorization or consent of Dozo Live, you shall not:
        • In any way to a third party or unspecified public dissemination, disclosure;
        • Use the trade secrets of Dozo Live for purposes other than the purpose of this agreement.
        • This clause shall survive the termination of this agreement.</Text>

        <Text style={styles.sectionTitle}>6. Modification, rescission and termination of the agreement</Text>
        
        <Text style={styles.paragraph}>6.1 Dozo Live has the right to change, terminate or terminate this agreement when necessary.</Text>
        
        <Text style={styles.paragraph}>6.2 Dozo Live has the right to terminate the agreement immediately if you have any of the following circumstances:
        • Dozo Live finds that you have violated the statements and commitments made in this Agreement;
        • Direct or indirect damage to the interests of Dozo Live caused by your personal behavior;
        • Violating the laws, regulations or normative provisions of Singapore or your place;
        • Breach of other obligations stipulated in this Agreement;
        • Perform this agreement in a way that does not meet the requirements of Dozo Live, such as passivity or inaction, and fail to correct within 10 days after Dozo Live's notice.</Text>

        <Text style={styles.sectionTitle}>7. Liability for breach of contract</Text>
        
        <Text style={styles.paragraph}>7.1 Dozo Live, Dozo Live and the third party shall not be responsible for any direct and indirect damages and expenses incurred by you.</Text>
        
        <Text style={styles.paragraph}>7.2 Dozo Live has the right to claim compensation for the loss caused by your breach of this agreement.</Text>

        <Text style={styles.sectionTitle}>8. Others</Text>
        
        <Text style={styles.paragraph}>8.1 This agreement can be updated by Dozo Live at any time. Once the updated agreement terms are published, they will replace the original agreement terms. After the change, we will inform you and need you to agree to this agreement again. You can check the latest version of the agreement terms in Dozo Live platform. If you do not accept the modified terms after Dozo Live modifies the terms of the agreement, please stop using the services provided by Dozo Live immediately. If you continue to use the services provided by Dozo Live, you will be deemed to accept the modified agreement.</Text>
        
        <Text style={styles.paragraph}>8.2 Any dispute related to this Agreement shall be settled by both parties through negotiation. If the negotiation fails, please contact our data protection officer by email to info@dozolive.com or send a letter to 111 Somerset Road, #06-11, Singapore, 238164. (attention: director name, YIFENG HU)</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1f1f1f",
  },
  paragraph: {
    fontSize: 16,
    color: "#777777",
    lineHeight: 24,
    marginBottom: 18,
  },
});

export default PrivacyPolicy;