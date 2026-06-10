<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>🌈 SproutJoy Childcare Services Summary</title>
        <style>
          body {
            font-family: 'Comic Sans MS', cursive, sans-serif;
            background-color: #fffaf0;
            padding: 30px;
          }

          h1 {
            text-align: center;
            color: #ff69b4;
            font-size: 30px;
            margin-bottom: 40px;
            text-shadow: 1px 1px #ffccff;
          }

          h2 {
            color: #ff69b4;
            font-size: 24px;
            margin-top: 40px;
            text-shadow: 1px 1px #ffc0cb;
          }

          p {
            font-size: 16px;
            margin-bottom: 20px;
            color: #555;
          }

          table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            background-color: #ffffff;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            margin-bottom: 40px;
          }

          th {
            background: #ffd700;
            color: #333;
            font-size: 18px;
            padding: 15px;
            text-align: left;
            border-bottom: 2px solid #ffa500;
          }

          td {
            padding: 15px;
            background-color: #fff8dc;
            border-bottom: 1px solid #ffe4b5;
            font-size: 16px;
            color: #333;
          }

          tr:nth-child(even) td {
            background-color: #ffefd5;
          }

          tr:hover td {
            background-color: #ffe4e1;
            transition: background-color 0.3s;
          }
		  
        </style>
      </head>
      <body>
        <h1>🌈 OUR SERVICES SUMMARY 💐</h1>

        <xsl:for-each select="OurServices/Service">
          <h2>
            <xsl:value-of select="@type"/>
          </h2>
          <p><xsl:value-of select="description"/></p>

          <xsl:choose>

            <!-- Daycare Programme Table -->
            <xsl:when test="@type='DAYCARE PROGRAMMES'">
              <table>
                <tr>
                  <th>No.</th>
                  <th>Programme Name</th>
                  <th>Age Group</th>
                  <th>Operating Hours</th>
                  <th>Days</th>
                  <th>Booking Notice</th>
                  <th>Price</th>
                </tr>
                <xsl:for-each select="Programmes/Programme" >
                  <tr>
                    <td><xsl:value-of select="position()"/></td>
                    <td><xsl:value-of select="@name"/></td>
                    <td><xsl:value-of select="@age"/></td>
                    <td><xsl:value-of select="operation/@time"/></td>
                    <td><xsl:value-of select="operation/@days"/></td>
                    <td><xsl:value-of select="booking/@notice"/></td>
                    <td><xsl:value-of select="price"/></td>
                  </tr>
                </xsl:for-each>
              </table>
            </xsl:when>

            <!-- Nanny Care Plan Table -->
            <xsl:when test="@type='NANNY CARE PLAN'">
              <table>
                <tr>
                  <th>No.</th>
                  <th>Plan Name</th>
                  <th>Age Group</th>
                  <th>Operating Hours</th>
                  <th>Days</th>
                  <th>Booking Notice</th>
                  <th>Price</th>
                </tr>
                <xsl:for-each select="Plans/Plan">
                  <xsl:sort select="@name"/>
                  <tr>
                    <td><xsl:value-of select="position()"/></td>
                    <td><xsl:value-of select="@name"/></td>
                    <td><xsl:value-of select="@age"/></td>
                    <td><xsl:value-of select="operation/@time"/></td>
                    <td><xsl:value-of select="operation/@days"/></td>
                    <td><xsl:value-of select="booking/@notice"/></td>
                    <td><xsl:value-of select="price"/></td>
                  </tr>
                </xsl:for-each>
              </table>
            </xsl:when>

            <!-- Pop-Up Nanny Table -->
            <xsl:when test="@type='POP-UP NANNY'">
              <table>
                <tr>
                  <th>Features</th>
                  <th>Operating Hours</th>
                  <th>Days</th>
                  <th>Booking Notice</th>
                  <th>Price</th>
                </tr>
                <tr>
                  <td><xsl:value-of select="Details/features"/></td>
                  <td><xsl:value-of select="Details/operation/@time"/></td>
                  <td><xsl:value-of select="Details/operation/@days"/></td>
                  <td><xsl:value-of select="Details/booking/@notice"/></td>
                  <td><xsl:value-of select="Details/price"/></td>
                </tr>
              </table>
            </xsl:when>

          </xsl:choose>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
