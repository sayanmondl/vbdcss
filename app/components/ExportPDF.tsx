"use client";

import React from "react";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { StudentScoreProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Times-Roman",
    padding: 40,
    fontSize: 12,
    lineHeight: 1.6,
  },
  centerText: {
    textAlign: "center",
  },
  header: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  subheading: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 4,
  },
  subsubheading: {
    fontSize: 11,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 2,
  },
  table: {
    display: "flex",
    width: "auto",
    marginTop: 10,
    borderTop: "1 solid black",
    borderLeft: "1 solid black",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid black",
  },
  tableHeaderCell: {
    flex: 1,
    padding: 5,
    fontWeight: "bold",
    fontSize: 11,
    borderRight: "1 solid black",
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 12,
    borderRight: "1 solid black",
  },
  image: {
    width: 60,
    height: 60,
    alignSelf: "center",
    marginBottom: 6,
  },
  serialNumber: {
    width: 40,
    textAlign: "center",
    fontSize: 12,
    borderRight: "1 solid black",
    fontWeight: "bold",
    padding: 5,
  },
  serialNumberCell: {
    width: 40,
    textAlign: "center",
    fontSize: 12,
    borderRight: "1 solid black",
    padding: 5,
  },
  centerRight: {
    display: "flex",
    alignItems: "center",
  },
  rightItem: {
    marginLeft: "auto",
  },
  bold: {
    fontWeight: "bold",
  }
});

export function AssessmentPDF({
  data,
  semester,
  subject,
  totalMarks,
  examDate,
}: {
  data: StudentScoreProps[];
  semester: string;
  subject: string;
  totalMarks?: number;
  examDate: Date;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.heading}>VISVA-BHARATI</Text>
          <Text style={styles.heading}>
            Department of Computer and System Sciences
          </Text>
        </View>
        <Text style={styles.subheading}>{subject}</Text>
        <Text style={styles.subsubheading}>
          Semester-{semester} - {examDate.getFullYear()}
        </Text>
        <View style={styles.centerRight}>
          <Text style={styles.bold}>RESULT</Text>
          <Text style={styles.rightItem}>Date: {examDate.toLocaleDateString()}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.serialNumber}>SL.</Text>
            <Text style={styles.tableHeaderCell}>STUDENT NAME</Text>
            <Text style={styles.tableHeaderCell}>TOTAL MARKS</Text>
            <Text style={styles.tableHeaderCell}>OBTAINED MARKS</Text>
          </View>

          {data.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.serialNumberCell}>{i + 1}</Text>
              <Text style={styles.tableCell}>{item.studentName}</Text>
              <Text style={styles.tableCell}>{totalMarks}</Text>
              <Text style={styles.tableCell}>{item.obtained}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

const ExportPDF = ({
  studentScores,
  semester,
  subject,
  totalMarks,
  examDate,
}: {
  studentScores: StudentScoreProps[];
  semester: string;
  subject: string;
  totalMarks?: number;
  examDate: Date;
}) => {
  return (
    <PDFDownloadLink
      document={
        <AssessmentPDF
          semester={semester}
          subject={subject}
          totalMarks={totalMarks}
          examDate={examDate}
          data={studentScores}
        />
      }
      fileName="assessment_report.pdf"
    >
      <Button variant="outline" size="sm" className="gap-2">
        <Download className="w-4 h-4" />
        Export Result
      </Button>
    </PDFDownloadLink>
  );
};

export default ExportPDF;
