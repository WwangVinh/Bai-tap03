import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Button } from 'react-native';

// Dữ liệu mẫu của danh sách thông báo
const notifications = [
    {
        id: '1',
        icon: 'https://icon-url.com/icon1.png', // Đặt đường dẫn hoặc sử dụng icon font
        title: 'Bước 1 Xác định nhu cầu khách hàng',
        content: 'Vũ Văn Hoàng sắp đến hạn lúc 01/08/2020 9:00',
        time: '20/08/2020, 06:00',
    },
    {
        id: '2',
        icon: 'https://www.bing.com/images/search?view=detailV2&insightstoken=bcid_S9N3V445kooHcCaHgOl52n2mID1O.....wc*ccid_03dXjjmS&form=SBIIRP&iss=SBIUPLOADGET&sbisrc=ImgPaste&idpbck=1&sbifsz=90+x+351+%c2%b7+2.63+kB+%c2%b7+png&sbifnm=image.png&thw=90&thh=351&ptime=6&dlen=3588&expw=208&exph=208&selectedindex=8&id=10997527E5D968FB3247B34AE4F820CAB78F9F3E&ccid=NVvWj2He&vt=2&sim=11&cit=bcid_S9N3V445kooHcCaHgOl52n2mID1O.....wc*ccid_03dXjjmS&simid=608051908369520271&ck=D0BF33F457B15C3D9A2AE4A8DFCE15C6&thid=OIP.NVvWj2HeuyalwDJoV7pHVgAAAA&mediaurl=https%3A%2F%2Fwww.jurnal.id%2Fwp-content%2Fuploads%2F2023%2F09%2FIcon-1-1.png&cdnurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.355bd68f61debb26a5c0326857ba4756%3Frik%3DPp%252bPt8og%252bORKsw%26pid%3DImgRaw%26r%3D0',
        title: 'Bạn có khách hàng mới!',
        content: 'Chúc mừng bạn, bạn có khách hàng mới. Hãy mau chóng liên lạc ngay.',
        time: '20/08/2020, 06:00',
    },
    {
        id: '3',
        icon: 'https://www.bing.com/images/search?view=detailV2&insightstoken=bcid_S9N3V445kooHcCaHgOl52n2mID1O.....wc*ccid_03dXjjmS&form=SBIIRP&iss=SBIUPLOADGET&sbisrc=ImgPaste&idpbck=1&sbifsz=90+x+351+%c2%b7+2.63+kB+%c2%b7+png&sbifnm=image.png&thw=90&thh=351&ptime=6&dlen=3588&expw=208&exph=208&selectedindex=8&id=10997527E5D968FB3247B34AE4F820CAB78F9F3E&ccid=NVvWj2He&vt=2&sim=11&cit=bcid_S9N3V445kooHcCaHgOl52n2mID1O.....wc*ccid_03dXjjmS&simid=608051908369520271&ck=D0BF33F457B15C3D9A2AE4A8DFCE15C6&thid=OIP.NVvWj2HeuyalwDJoV7pHVgAAAA&mediaurl=https%3A%2F%2Fwww.jurnal.id%2Fwp-content%2Fuploads%2F2023%2F09%2FIcon-1-1.png&cdnurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.355bd68f61debb26a5c0326857ba4756%3Frik%3DPp%252bPt8og%252bORKsw%26pid%3DImgRaw%26r%3D0',
        title: 'Khách hàng được chia sẻ bị trùng',
        content: 'Rất tiếc, khách hàng được chia sẻ đã tồn tại trên hệ thống. Vui lòng chia sẻ khách hàng.',
        time: '20/08/2020, 06:00',
    },
    {
        id: '4',
        icon: 'https://www.bing.com/images/search?view=detailV2&insightstoken=bcid_S9N3V445kooHcCaHgOl52n2mID1O.....wc*ccid_03dXjjmS&form=SBIIRP&iss=SBIUPLOADGET&sbisrc=ImgPaste&idpbck=1&sbifsz=90+x+351+%c2%b7+2.63+kB+%c2%b7+png&sbifnm=image.png&thw=90&thh=351&ptime=6&dlen=3588&expw=208&exph=208&selectedindex=8&id=10997527E5D968FB3247B34AE4F820CAB78F9F3E&ccid=NVvWj2He&vt=2&sim=11&cit=bcid_S9N3V445kooHcCaHgOl52n2mID1O.....wc*ccid_03dXjjmS&simid=608051908369520271&ck=D0BF33F457B15C3D9A2AE4A8DFCE15C6&thid=OIP.NVvWj2HeuyalwDJoV7pHVgAAAA&mediaurl=https%3A%2F%2Fwww.jurnal.id%2Fwp-content%2Fuploads%2F2023%2F09%2FIcon-1-1.png&cdnurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.355bd68f61debb26a5c0326857ba4756%3Frik%3DPp%252bPt8og%252bORKsw%26pid%3DImgRaw%26r%3D0',
        title: 'Khách hàng được thêm bị trùng',
        content: 'Rất tiếc, khách hàng được thêm đã tồn tại trên hệ thống. Vui lòng thêm khách hàng.',
        time: '20/08/2020, 06:00',
    },
    {
        id: '5',
        icon: 'https://icon-url.com/icon5.png',
        title: 'Công việc sắp đến hạn trong hôm nay',
        content: 'Bạn có 17 công việc sắp đến hạn trong hôm nay.',
        time: '20/08/2020, 06:00',
    },
    {
        id: '6',
        icon: 'https://icon-url.com/icon6.png',
        title: 'Công việc đã quá hạn',
        content: 'Bạn có 17 công việc bị quá hạn. Hãy kiểm tra và lên kế hoạch hoàn thành công việc.',
        time: '20/08/2020, 06:00',
    },
];

// Component hiển thị từng item trong danh sách
const NotificationItem = ({ item, onPress }) => (
    <TouchableOpacity onPress={() => onPress(item)}>
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.icon }} style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.content}>{item.content}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

// Component chính
const NotificationsScreen = () => {
    const [selectedNotification, setSelectedNotification] = useState(null); // Thông báo được chọn để hiển thị trong modal
    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = (item) => {
        setSelectedNotification(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedNotification(null);
    };

    return (
        <View style={styles.container}>
            {/* Tiêu đề "Thông báo" cố định phía trên */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Thông báo</Text>
            </View>

            {/* Danh sách thông báo */}
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NotificationItem item={item} onPress={handlePress} />}
                contentContainerStyle={styles.listContent}
            />

            {/* Modal để hiển thị chi tiết thông báo */}
            {selectedNotification && (
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedNotification.title}</Text>
                            <Text style={styles.modalContentText}>{selectedNotification.content}</Text>
                            <Text style={styles.modalTime}>{selectedNotification.time}</Text>
                            <Button title="Đóng" onPress={closeModal} />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

// StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        alignItems: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    listContent: {
        paddingBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    content: {
        fontSize: 14,
        color: '#555555',
    },
    time: {
        fontSize: 12,
        color: '#AAAAAA',
        marginTop: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
    },
    modalContentText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    modalTime: {
        fontSize: 12,
        color: '#AAAAAA',
        marginBottom: 10,
    },
});

export default NotificationsScreen;
